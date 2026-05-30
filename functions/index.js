/**
 * Firebase Cloud Functions for OneRoom Stats
 * 
 * This file contains Cloud Functions to automatically update app statistics
 * including Play Store data (rating, downloads, reviews)
 * 
 * Setup:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Initialize functions: firebase init functions
 * 3. Install dependencies: cd functions && npm install
 * 4. Deploy: firebase deploy --only functions
 */

const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

/**
 * Scheduled function to fetch Play Store data
 * Runs every 6 hours to update rating and download count
 * 
 * Schedule format: https://crontab.guru/
 * 0 star-slash-6 star star star = Every 6 hours
 */
exports.updatePlayStoreStats = functions.scheduler.onSchedule({
    schedule: '0 */6 * * *',
    timeZone: 'America/New_York', // Change to your timezone
}, async (event) => {
    try {
        // Dynamic import for ES Module
        const gplayModule = await import('google-play-scraper');
        const gplay = gplayModule.default;

        // Your app's package name on Play Store
        // Find it in: Play Console → App → Dashboard → Package name
        // Or in your Android app: android/app/build.gradle → applicationId
        const APP_ID = 'com.oneroom.app'; // Your actual package name

        console.log('Fetching Play Store data for:', APP_ID);

        // Fetch app details from Play Store (specify country: 'in' to fetch rating from Indian Play Store)
        const appData = await gplay.app({ appId: APP_ID, country: 'in' });

        // Extract relevant stats
        const playStoreStats = {
            rating: appData.score || 0,
            ratingCount: appData.ratings || 0,
            reviews: appData.reviews || 0,
            downloads: parseDownloads(appData.installs || '0'),
            version: appData.version || 'Unknown',
            updated: appData.updated || new Date(),
            lastFetched: admin.firestore.FieldValue.serverTimestamp()
        };

        console.log('Play Store stats:', playStoreStats);

        // Update Firestore
        await db.collection('appStats').doc('playStore').set(playStoreStats, { merge: true });

        // Also update the global stats with rating and downloads
        await db.collection('appStats').doc('global').set({
            appRating: playStoreStats.rating,
            ratingCount: playStoreStats.ratingCount, // Added rating count
            totalDownloads: playStoreStats.downloads,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log('Successfully updated Play Store stats');
        return null;
    } catch (error) {
        console.error('Error updating Play Store stats:', error);
        throw error;
    }
});

/**
 * HTTP function to manually trigger Play Store stats update
 * Call this endpoint to force an update
 * 
 * Usage: https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/fetchPlayStoreData
 */
exports.fetchPlayStoreData = functions.https.onRequest(async (req, res) => {
    try {
        // Dynamic import for ES Module
        const gplayModule = await import('google-play-scraper');
        const gplay = gplayModule.default;

        const APP_ID = 'com.oneroom.app'; // Your actual package name

        const appData = await gplay.app({ appId: APP_ID, country: 'in' });

        const playStoreStats = {
            rating: appData.score || 0,
            ratingCount: appData.ratings || 0,
            reviews: appData.reviews || 0,
            downloads: parseDownloads(appData.installs || '0'),
            version: appData.version || 'Unknown',
            updated: appData.updated || new Date(),
            lastFetched: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('appStats').doc('playStore').set(playStoreStats, { merge: true });

        await db.collection('appStats').doc('global').set({
            appRating: playStoreStats.rating,
            ratingCount: playStoreStats.ratingCount, // Added rating count
            totalDownloads: playStoreStats.downloads,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({
            success: true,
            data: playStoreStats
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Scheduled function to calculate and update app statistics
 * Counts users, tasks, expenses from Firestore collections
 * Runs daily at midnight
 */
/**
 * Scheduled function to calculate and update app statistics
 * Counts users, expenses, and bug reports from Firestore collections
 * Runs daily at midnight to correct any drift in counters
 */
exports.updateAppStats = functions.scheduler.onSchedule({
    schedule: '0 0 * * *',
    timeZone: 'America/New_York'
}, async (event) => {
    try {
        console.log('Calculating app statistics...');

        // 1. Count Active Users
        const usersSnapshot = await db.collection('users').count().get();
        const activeUsers = usersSnapshot.data().count;

        // 2. Count & Sum Expenses (using collectionGroup to find all expenses in all rooms)
        // Note: 'expenses' must be the collection name
        const expensesCountSnapshot = await db.collectionGroup('expenses').count().get();
        const totalExpensesCount = expensesCountSnapshot.data().count;

        // Calculate total amount (sum) - optimize if possible with aggregate, otherwise manual loop
        // Ideally: await db.collectionGroup('expenses').aggregate({ total: admin.firestore.AggregateField.sum('amount') }).get();
        let expensesTracked = 0;
        try {
            // Try aggregation first (requires index)
            const expensesSumSnapshot = await db.collectionGroup('expenses')
                .aggregate({
                    totalAmount: admin.firestore.AggregateField.sum('amount')
                })
                .get();
            expensesTracked = expensesSumSnapshot.data().totalAmount || 0;
        } catch (e) {
            console.log('Aggregation failed (likely missing index), falling back to manual sum', e.message);
            const allExpenses = await db.collectionGroup('expenses').get();
            allExpenses.forEach(doc => {
                const data = doc.data();
                expensesTracked += (Number(data.amount) || 0);
            });
        }

        // 3. Count Bug Reports
        const bugsSnapshot = await db.collection('bug_reports').count().get();
        const bugReports = bugsSnapshot.data().count;

        // Update global stats
        const stats = {
            activeUsers,
            totalExpensesCount,
            expensesTracked,
            bugReports,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('appStats').doc('global').set(stats, { merge: true });

        console.log('Successfully updated app stats:', stats);
        return null;
    } catch (error) {
        console.error('Error updating app stats:', error);
        throw error;
    }
});

/**
 * HTTP function to manually force recalculation of all stats
 * Useful for initializing data or fixing drift
 * Usage: https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/recalculateStats
 */
exports.recalculateStats = functions.https.onRequest(async (req, res) => {
    try {
        console.log('Recalculating app statistics manually...');

        // 1. Count Active Users
        const usersSnapshot = await db.collection('users').count().get();
        const activeUsers = usersSnapshot.data().count;

        // 2. Count & Sum Expenses
        const expensesCountSnapshot = await db.collectionGroup('expenses').count().get();
        const totalExpensesCount = expensesCountSnapshot.data().count;

        let expensesTracked = 0;
        try {
            const expensesSumSnapshot = await db.collectionGroup('expenses')
                .aggregate({
                    totalAmount: admin.firestore.AggregateField.sum('amount')
                })
                .get();
            expensesTracked = expensesSumSnapshot.data().totalAmount || 0;
        } catch (e) {
            console.log('Aggregation failed, falling back to manual sum', e.message);
            const allExpenses = await db.collectionGroup('expenses').get();
            allExpenses.forEach(doc => {
                const data = doc.data();
                expensesTracked += (Number(data.amount) || 0);
            });
        }

        // 3. Count Bug Reports
        const bugsSnapshot = await db.collection('bug_reports').count().get();
        const bugReports = bugsSnapshot.data().count;

        // Update global stats
        const stats = {
            activeUsers,
            totalExpensesCount,
            expensesTracked,
            bugReports,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('appStats').doc('global').set(stats, { merge: true });

        res.json({
            success: true,
            message: 'Stats recalculated successfully',
            data: stats
        });
    } catch (error) {
        console.error('Error recalculating stats:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Real-time Triggers ---

// 1. Users Triggers
exports.updateUserStatsOnCreate = functions.firestore.onDocumentCreated('users/{userId}', async (event) => {
    await db.collection('appStats').doc('global').update({
        activeUsers: admin.firestore.FieldValue.increment(1)
    });
});

exports.updateUserStatsOnDelete = functions.firestore.onDocumentDeleted('users/{userId}', async (event) => {
    await db.collection('appStats').doc('global').update({
        activeUsers: admin.firestore.FieldValue.increment(-1)
    });
});

// 2. Bug Reports Triggers
exports.updateBugStatsOnCreate = functions.firestore.onDocumentCreated('bug_reports/{reportId}', async (event) => {
    const data = event.data.data();
    const status = data.status || 'open';
    const batch = db.batch();
    const globalRef = db.collection('appStats').doc('global');
    const bugStatsRef = db.collection('appStats').doc('bugStats');

    batch.update(globalRef, {
        bugReports: admin.firestore.FieldValue.increment(1)
    });
    batch.set(bugStatsRef, {
        total: admin.firestore.FieldValue.increment(1),
        [status]: admin.firestore.FieldValue.increment(1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    await batch.commit();
});

exports.updateBugStatsOnDelete = functions.firestore.onDocumentDeleted('bug_reports/{reportId}', async (event) => {
    const data = event.data.data();
    const status = data.status || 'open';
    const batch = db.batch();
    const globalRef = db.collection('appStats').doc('global');
    const bugStatsRef = db.collection('appStats').doc('bugStats');

    batch.update(globalRef, {
        bugReports: admin.firestore.FieldValue.increment(-1)
    });
    batch.set(bugStatsRef, {
        total: admin.firestore.FieldValue.increment(-1),
        [status]: admin.firestore.FieldValue.increment(-1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    await batch.commit();
});

// Track bug status changes for public stats
exports.updateBugStatsOnUpdate = functions.firestore.onDocumentUpdated('bug_reports/{reportId}', async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    const oldStatus = before.status || 'open';
    const newStatus = after.status || 'open';

    if (oldStatus !== newStatus) {
        await db.collection('appStats').doc('bugStats').set({
            [oldStatus]: admin.firestore.FieldValue.increment(-1),
            [newStatus]: admin.firestore.FieldValue.increment(1),
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }
});

// 3. Expenses Triggers (Assuming 'expenses' is a subcollection of 'rooms')
exports.updateExpenseStatsOnCreate = functions.firestore.onDocumentCreated('rooms/{roomId}/expenses/{expenseId}', async (event) => {
    const data = event.data.data();
    const amount = Number(data.amount) || 0;

    await db.collection('appStats').doc('global').update({
        totalExpensesCount: admin.firestore.FieldValue.increment(1),
        expensesTracked: admin.firestore.FieldValue.increment(amount)
    });
});

exports.updateExpenseStatsOnDelete = functions.firestore.onDocumentDeleted('rooms/{roomId}/expenses/{expenseId}', async (event) => {
    const data = event.data.data();
    const amount = Number(data.amount) || 0;

    await db.collection('appStats').doc('global').update({
        totalExpensesCount: admin.firestore.FieldValue.increment(-1),
        expensesTracked: admin.firestore.FieldValue.increment(-amount)
    });
});

/**
 * Helper function to parse download count from Play Store format
 * Converts "10,000+" to 10000, "1,000,000+" to 1000000, etc.
 */
function parseDownloads(installsString) {
    if (!installsString) return 0;

    // Remove commas and plus sign
    const cleaned = installsString.replace(/[,+]/g, '');

    // Parse the number
    const num = parseInt(cleaned, 10);

    return isNaN(num) ? 0 : num;
}

/**
 * HTTP function to get current stats (for testing)
 * Usage: https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/getStats
 */
exports.getStats = functions.https.onRequest(async (req, res) => {
    try {
        const globalStats = await db.collection('appStats').doc('global').get();
        const playStoreStats = await db.collection('appStats').doc('playStore').get();

        res.json({
            success: true,
            global: globalStats.exists ? globalStats.data() : null,
            playStore: playStoreStats.exists ? playStoreStats.data() : null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ────────────────────────────────────────────────
// Bug Reply Cloud Function
// Sends email reply to bug reporter + stores in Firestore
// ────────────────────────────────────────────────

/**
 * Callable Cloud Function: sendBugReply
 * 
 * Called from the Bug Dashboard when admin replies to a bug report.
 * - Sends email to the reporter's contact email via Nodemailer
 * - Stores the reply in bug_reports/{bugId}/replies subcollection
 * 
 * Required Firebase Config (set via CLI):
 *   firebase functions:config:set
 *     smtp.email="your-email@gmail.com"
 *     smtp.password="your-app-password"
 * 
 * Or use environment variables in .env file:
 *   SMTP_EMAIL=your-email@gmail.com
 *   SMTP_PASSWORD=your-app-password
 */
exports.sendBugReply = functions.https.onCall(async (request) => {
    // Verify caller is authenticated
    if (!request.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Must be logged in to send replies.'
        );
    }

    const { bugId, bugTitle, recipientEmail, message } = request.data;

    // Validate inputs
    if (!bugId || !message) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'bugId and message are required.'
        );
    }

    // Verify the bug report exists
    const bugDoc = await db.collection('bug_reports').doc(bugId).get();
    if (!bugDoc.exists) {
        throw new functions.https.HttpsError(
            'not-found',
            'Bug report not found.'
        );
    }

    // Try to send email if recipient email is valid
    let emailSent = false;
    if (recipientEmail && recipientEmail.includes('@')) {
        try {
            const nodemailer = require('nodemailer');

            // Configure SMTP transporter
            // Option 1: Using environment variables
            const smtpEmail = process.env.SMTP_EMAIL;
            const smtpPassword = process.env.SMTP_PASSWORD;

            if (smtpEmail && smtpPassword) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: smtpEmail,
                        pass: smtpPassword,
                    },
                });

                await transporter.sendMail({
                    from: `"One Room Support" <${smtpEmail}>`,
                    to: recipientEmail,
                    subject: `Re: Bug Report — ${bugTitle || 'Your Report'}`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
                            <div style="background: linear-gradient(135deg, #8e7cf0, #674eeb); padding: 20px 24px; border-radius: 12px 12px 0 0;">
                                <h2 style="color: white; margin: 0; font-size: 18px;">One Room — Bug Report Update</h2>
                            </div>
                            <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                                <p style="color: #374151; margin: 0 0 8px;">Regarding: <strong>${bugTitle || 'Your Bug Report'}</strong></p>
                                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                                <div style="color: #1f2937; line-height: 1.7; white-space: pre-wrap;">${message}</div>
                                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                                <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                                    — The One Room Team<br/>
                                    This is an automated reply. Please report new issues from within the app.
                                </p>
                            </div>
                        </div>
                    `,
                });

                emailSent = true;
                console.log(`Email sent to ${recipientEmail} for bug ${bugId}`);
            } else {
                console.warn('SMTP credentials not configured. Set SMTP_EMAIL and SMTP_PASSWORD environment variables.');
            }
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Don't throw — reply is still saved in Firestore
        }
    }

    return { success: true, emailSent };
});

// ────────────────────────────────────────────────
// Admin Notification Cloud Function
// Sends push notifications to users/rooms/broadcast via FCM
// ────────────────────────────────────────────────

/**
 * Callable Cloud Function: sendAdminNotification
 * 
 * Called from the Admin Panel to send push notifications.
 * Supports three types:
 *   - broadcast: Sends to 'all_users' FCM topic
 *   - individual: Sends to a specific user's FCM tokens
 *   - room: Sends to 'room_{roomId}' FCM topic
 */
exports.sendAdminNotification = functions.https.onCall(async (request) => {
    // Verify caller is authenticated
    if (!request.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Must be logged in to send notifications.'
        );
    }

    const { type, title, body, userId, roomId } = request.data;

    if (!title || !body) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'title and body are required.'
        );
    }

    const messaging = admin.messaging();
    let sent = 0;

    try {
        if (type === 'broadcast') {
            // Send to all_users topic
            await messaging.send({
                topic: 'all_users',
                notification: { title, body },
                data: { type: 'admin_broadcast' },
                android: { priority: 'high' },
                apns: { payload: { aps: { sound: 'default' } } },
            });
            sent = 1; // Topic sends don't return exact count
            console.log('Broadcast notification sent to all_users topic');

        } else if (type === 'individual' && userId) {
            // Fetch user's FCM tokens
            const tokensSnap = await db.collection('users').doc(userId).collection('tokens').get();
            const tokens = tokensSnap.docs.map(d => d.data().token).filter(Boolean);

            if (tokens.length === 0) {
                return { success: true, sent: 0, message: 'User has no registered devices' };
            }

            // Send to each token
            const response = await messaging.sendEachForMulticast({
                tokens,
                notification: { title, body },
                data: { type: 'admin_notification' },
                android: { priority: 'high' },
                apns: { payload: { aps: { sound: 'default' } } },
            });

            sent = response.successCount;

            // Clean up invalid tokens
            response.responses.forEach((resp, i) => {
                if (resp.error && (
                    resp.error.code === 'messaging/invalid-registration-token' ||
                    resp.error.code === 'messaging/registration-token-not-registered'
                )) {
                    db.collection('users').doc(userId).collection('tokens').doc(tokensSnap.docs[i].id).delete();
                }
            });

            console.log(`Individual notification sent to ${userId}: ${sent}/${tokens.length} succeeded`);

        } else if (type === 'room' && roomId) {
            // Send to room topic
            await messaging.send({
                topic: `room_${roomId}`,
                notification: { title, body },
                data: { type: 'admin_room_notification', roomId },
                android: { priority: 'high' },
                apns: { payload: { aps: { sound: 'default' } } },
            });
            sent = 1;
            console.log(`Room notification sent to room_${roomId}`);

        } else {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Invalid notification type. Use broadcast, individual, or room.'
            );
        }

        return { success: true, sent };
    } catch (error) {
        console.error('Failed to send notification:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

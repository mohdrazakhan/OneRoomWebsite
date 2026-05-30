import React from 'react'
import './NeutralThirdParty.css'

function NeutralThirdParty() {
    return (
        <section className="neutral-section bg-pattern">
            <div className="container">
                <div className="neutral-grid">
                    {/* Visual Mockup on the Left */}
                    <div className="neutral-visual reveal">
                        <div className="notification-canvas bento-shadow">
                            <div className="notification-card terracotta-notification">
                                <div className="notification-badge terracotta-badge">
                                    <span className="material-symbols-outlined">notifications_active</span>
                                </div>
                                <div className="notification-content">
                                    <h4>Automatic Reminder</h4>
                                    <p>"Hey Alex, just a nudge that the electricity bill (₹420) is due tomorrow."</p>
                                </div>
                            </div>
                            
                            <div className="notification-card sage-notification">
                                <div className="notification-badge sage-badge">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="notification-content">
                                    <h4>Neutral Notification</h4>
                                    <p>"Sarah just took out the trash. Great job everyone!"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text content on the Right */}
                    <div className="neutral-text reveal" style={{ animationDelay: '0.2s' }}>
                        <span className="section-pre-title">COMMUNICATION</span>
                        <h2 className="section-title">The Neutral Third Party</h2>
                        <p className="section-description">
                            Stop being the "bad guy." OneRoom automates the awkward conversations. Whether it’s reminding a roommate about an overdue bill or tracking whose turn it is to scrub the sink, the app handles the messaging with a friendly, neutral tone.
                        </p>
                        <ul className="neutral-list">
                            <li>
                                <span className="material-symbols-outlined check-icon">verified</span>
                                <span>Automated "Nudge" notifications</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined check-icon">verified</span>
                                <span>Fact-based dispute resolution</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined check-icon">verified</span>
                                <span>Real-time household sentiment tracking</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NeutralThirdParty

import React, { useState } from 'react'
import FeaturesBento from '../components/FeaturesBento'
import './FeaturesPage.css'
import { t } from '../utils/i18n'

function FeaturesPage() {
    const [showIosPopup, setShowIosPopup] = useState(false)

    const handleIosClick = () => {
        setShowIosPopup(true)
        setTimeout(() => setShowIosPopup(false), 3000)
    }

    return (
        <main className="page-container reveal-on-scroll is-visible">
            {showIosPopup && (
                <div className="ios-popup">
                    <span>🍎</span>
                    <span>{t('Coming Soon ')}</span>
                </div>
            )}
            
            <div className="container">
                {/* Hero Header */}
                <header className="features-page-header">
                    <h1>{t('Harmonious Living,')}<br /><span className="text-gradient">{t('Automated.')}</span></h1>
                    <p>
                        {t('Stop the "social friction" before it starts. OneRoom handles the bills, the chores, and the rules, so you can focus on being great roommates.')}
                    </p>
                </header>

                {/* Primary Bento Features Grid */}
                <FeaturesBento />

                {/* Dynamic Call to Action Block */}
                <section className="features-cta-section bento-shadow">
                    <div className="features-cta-content">
                        <h2>{t('Ready to transform your shared living?')}</h2>
                        <p>{t('Join 50,000+ roommates who have replaced house-group-chat drama with OneRoom harmony.')}</p>
                        <div className="features-cta-buttons">
                            <button className="btn btn-primary" onClick={handleIosClick}>
                                <span>{t('Download for iOS')}</span>
                                <span className="material-symbols-outlined">{t('download')}</span>
                            </button>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.oneroom.app&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="btn btn-outline">
                                    <span>{t('Download for Android')}</span>
                                    <span className="material-symbols-outlined">{t('play_circle')}</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Secondary details grid */}
                <section className="details-section">
                    <div className="details-grid">
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-sage">
                                <span className="material-symbols-outlined">{t('receipt_long')}</span>
                            </div>
                            <h3>{t('Receipt OCR')}</h3>
                            <p>{t('Snap a photo of any receipt. Our AI reads the line items and suggests the right split for you.')}</p>
                        </div>
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-terracotta">
                                <span className="material-symbols-outlined">{t('autorenew')}</span>
                            </div>
                            <h3>{t('Task Rotation')}</h3>
                            <p>{t('The "who\'s turn is it" engine automatically rotates deep cleaning, trash, and supply runs fairly.')}</p>
                        </div>
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-purple">
                                <span className="material-symbols-outlined">{t('forum')}</span>
                            </div>
                            <h3>{t('Quiet Nudges')}</h3>
                            <p>{t('Remind roommates about rent or chores without the emotional weight of a direct text.')}</p>
                        </div>
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-sage">
                                <span className="material-symbols-outlined">{t('qr_code_scanner')}</span>
                            </div>
                            <h3>{t('Scan QR & Link Join')}</h3>
                            <p>{t('Invite roommates with secure links or let them scan a room QR code directly from your mobile screen to join in seconds.')}</p>
                        </div>
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-terracotta">
                                <span className="material-symbols-outlined">{t('folder_shared')}</span>
                            </div>
                            <h3>{t('Trip Media Folder')}</h3>
                            <p>{t('Share travel images and videos on trip folders. Files are stored for 30 days so members can download before it auto-deletes to optimize space.')}</p>
                        </div>
                        <div className="detail-card">
                            <div className="detail-icon-wrapper icon-purple">
                                <span className="material-symbols-outlined">{t('account_balance_wallet')}</span>
                            </div>
                            <h3>{t('Personal Wallet Sync')}</h3>
                            <p>{t('Maintain your personal wallet with auto-sync features that aggregate transaction records from across all rooms and trips.')}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default FeaturesPage

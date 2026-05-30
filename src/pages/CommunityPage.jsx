import React from 'react'
import './CommunityPage.css'
import { t } from '../utils/i18n'

function CommunityPage() {
    return (
        <main className="page-container reveal-on-scroll is-visible">
            <div className="container">
                
                {/* Hero Header */}
                <header className="community-header">
                    <span className="inline-block px-4 py-1.5 mb-6 bg-primary-light text-primary font-label-md rounded-full">
                        {t('Community')}
                    </span>
                    <h1>{t('Welcome to the Neighborhood')}</h1>
                    <p className="font-body-lg">
                        {t('Connect, share, and thrive in your shared spaces. The OneRoom community is built on mutual respect and shared experiences.')}
                    </p>
                </header>

                {/* Roommate Stories (Bento Grid) */}
                <section className="stories-section">
                    <div className="community-section-title">
                        <h2>{t('Roommate Stories')}</h2>
                        <a href="#stories" className="read-all-link">
                            <span>{t('Read all stories')}</span>
                            <span className="material-symbols-outlined">{t('arrow_forward')}</span>
                        </a>
                    </div>

                    <div className="stories-grid">
                        {/* Story Card 1 (Large 2/3) */}
                        <div className="story-card bento-shadow">
                            <div>
                                <div className="story-author-row">
                                    <div className="story-avatar">👩‍🎓</div>
                                    <div className="story-author-info">
                                        <h4>{t('Sarah & Emma')}</h4>
                                        <p>{t('Living together for 2 years')}</p>
                                    </div>
                                </div>
                                <p className="story-text">
                                    {t('"Before OneRoom, tracking utilities was a nightmare. Now, everything is automated, and we actually have time to enjoy our apartment instead of arguing over the Wi-Fi bill."')}
                                </p>
                            </div>
                            <div className="tags-row">
                                <span className="chip-tag terracotta-tag">{t('Finance')}</span>
                                <span className="chip-tag terracotta-tag">{t('Peace of mind')}</span>
                            </div>
                        </div>

                        {/* Story Card 2 (Small 1/3) */}
                        <div className="story-card small-card bento-shadow">
                            <div>
                                <div className="story-author-row">
                                    <div className="story-avatar">👨‍💼</div>
                                    <div className="story-author-info">
                                        <h4>{t('Marcus T.')}</h4>
                                        <p>{t('Student, 3 Roommates')}</p>
                                    </div>
                                </div>
                                <p className="story-text">
                                    {t('"The chore wheel feature literally saved our friendship. Highly recommend the \'Nudge\' button for gentle reminders."')}
                                </p>
                            </div>
                            <div className="tags-row">
                                <span className="chip-tag terracotta-tag">{t('Chores')}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Harmony Blog */}
                <section className="blog-section">
                    <h2 className="faq-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>{t('The Harmony Blog')}</h2>
                    
                    <div className="blog-grid">
                        {/* Main Featured Post (Col span 8) */}
                        <div className="blog-card blog-col-8 bento-shadow">
                            <div className="blog-image">
                                <span className="featured-badge">{t('Featured')}</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'rgba(139, 92, 246, 0.3)' }}>{t('meeting_room')}</span>
                            </div>
                            <div className="blog-content">
                                <p className="blog-meta">{t('Guide • 5 min read')}</p>
                                <h3 className="blog-title">{t('How to Host a Successful Roommate Meeting')}</h3>
                                <p className="blog-desc">
                                    {t('Set the agenda, keep it positive, and ensure everyone feels heard with these simple steps for harmonious living.')}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar smaller posts (Col span 4) */}
                        <div className="blog-col-4 sidebar-posts">
                            {/* Post 1 */}
                            <div className="small-post-card bento-shadow">
                                <div className="small-post-image">
                                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'rgba(214, 123, 98, 0.3)', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>{t('kitchen')}</span>
                                </div>
                                <div className="small-post-content">
                                    <p className="blog-meta" style={{ marginBottom: '0.2rem' }}>{t('Tips')}</p>
                                    <h4 className="small-post-title">{t('5 Rules for Sharing Fridge Space Without Drama')}</h4>
                                </div>
                            </div>
                            
                            {/* Post 2 */}
                            <div className="small-post-card bento-shadow">
                                <div className="small-post-image">
                                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'rgba(124, 144, 112, 0.3)', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>{t('forum')}</span>
                                </div>
                                <div className="small-post-content">
                                    <p className="blog-meta" style={{ marginBottom: '0.2rem' }}>{t('Communication')}</p>
                                    <h4 className="small-post-title">{t("The Art of the 'Gentle Nudge'")}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Forum Section */}
                <section className="forum-cta-section bento-shadow">
                    <span className="material-symbols-outlined forum-icon-wrapper">{t('forum')}</span>
                    <h2>{t('Join the Conversation')}</h2>
                    <p>
                        {t('Got a tricky situation? Want to share a success story? Our community forum is a safe space for roommates to connect and learn from each other.')}
                    </p>
                    <button className="btn btn-primary">{t('Enter the Forum')}</button>
                </section>

            </div>
        </main>
    )
}

export default CommunityPage

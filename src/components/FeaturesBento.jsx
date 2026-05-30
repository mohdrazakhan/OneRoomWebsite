import React from 'react'
import './FeaturesBento.css'

function FeaturesBento() {
    return (
        <section className="bento-section">
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">Everything You Need for Peaceful Living</h2>
                    <p className="section-subtitle">Thoughtfully designed features to eliminate conflict and celebrate contribution.</p>
                </div>

                <div className="bento-grid">
                    {/* 1. Task Manager */}
                    <div className="bento-card bg-soft-cream border-neutral group reveal">
                        {/* Decorative elements */}
                        <div className="card-deco">
                            <svg className="deco-circles" viewBox="0 0 200 200" fill="none">
                                <circle cx="160" cy="40" r="60" fill="rgba(124,144,112,0.06)" />
                                <circle cx="180" cy="20" r="30" fill="rgba(124,144,112,0.04)" />
                            </svg>
                            <div className="deco-dots sage">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="icon-badge icon-badge-sage">
                                <span className="material-symbols-outlined">task_alt</span>
                            </div>
                            <h3 className="bento-card-title">Task Manager</h3>
                            <p className="bento-card-desc">Organize cooking, cleaning & more into smart categories. Auto-rotate chores so everyone does their part.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag sage-tag">
                                    <span className="chip-dot sage-dot"></span>
                                    Daily
                                </span>
                                <span className="chip-tag sage-tag">
                                    <span className="chip-dot sage-dot"></span>
                                    Auto-rotate
                                </span>
                            </div>
                        </div>
                        <div className="card-bottom-image">
                            <img src="/assets/screenshot/Cooking.png" alt="Task management with cooking and cleaning categories" />
                        </div>
                    </div>

                    {/* 2. Expense Tracker */}
                    <div className="bento-card bg-low border-neutral row-layout group reveal">
                        <div className="card-deco">
                            <svg className="deco-wave" viewBox="0 0 400 100" fill="none">
                                <path d="M0 50 Q100 0 200 50 T400 50" stroke="rgba(214,123,98,0.08)" strokeWidth="2" fill="none" />
                                <path d="M0 70 Q100 20 200 70 T400 70" stroke="rgba(214,123,98,0.05)" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                        <div className="card-left">
                            <div className="icon-badge icon-badge-terracotta">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <h3 className="bento-card-title">Expense Tracker</h3>
                            <p className="bento-card-desc">Track every rupee spent. Filter by date, food, groceries and more. See who paid what, instantly.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag terracotta-tag">
                                    <span className="material-symbols-outlined chip-icon">receipt_long</span>
                                    Receipt Scan
                                </span>
                                <span className="chip-tag terracotta-tag">
                                    <span className="material-symbols-outlined chip-icon">sync_alt</span>
                                    Auto Split
                                </span>
                            </div>
                        </div>
                        <div className="card-right-image">
                            <img src="/assets/screenshot/Expenses.png" alt="Expense tracking with category filters" />
                        </div>
                    </div>

                    {/* 3. Expense Analytics */}
                    <div className="bento-card bg-primary-tint border-primary row-layout group reveal">
                        <div className="card-deco">
                            <svg className="deco-grid-pattern" viewBox="0 0 200 200" fill="none">
                                <rect x="10" y="10" width="40" height="40" rx="8" fill="rgba(139,92,246,0.04)" />
                                <rect x="60" y="60" width="40" height="40" rx="8" fill="rgba(139,92,246,0.03)" />
                                <rect x="110" y="10" width="40" height="40" rx="8" fill="rgba(139,92,246,0.02)" />
                                <rect x="160" y="60" width="40" height="40" rx="8" fill="rgba(139,92,246,0.04)" />
                            </svg>
                            <div className="deco-ring purple"></div>
                        </div>
                        <div className="card-left">
                            <div className="icon-badge icon-badge-purple">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <h3 className="bento-card-title">Expense Analytics</h3>
                            <p className="bento-card-desc">Visual spending breakdowns with pie charts. See who spends what — total transparency.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag purple-tag">
                                    <span className="material-symbols-outlined chip-icon">pie_chart</span>
                                    By Spender
                                </span>
                                <span className="chip-tag purple-tag">
                                    <span className="material-symbols-outlined chip-icon">bar_chart</span>
                                    By Consumer
                                </span>
                            </div>
                        </div>
                        <div className="card-right-image">
                            <img src="/assets/screenshot/Analytics.png" alt="Spending distribution analytics with pie chart" />
                        </div>
                    </div>

                    {/* 4. Personal Finance */}
                    <div className="bento-card bg-terracotta-tint border-terracotta group reveal">
                        <div className="card-deco">
                            <svg className="deco-coins" viewBox="0 0 200 200" fill="none">
                                <circle cx="170" cy="30" r="20" fill="rgba(214,123,98,0.08)" stroke="rgba(214,123,98,0.12)" strokeWidth="1" />
                                <circle cx="150" cy="50" r="14" fill="rgba(214,123,98,0.06)" stroke="rgba(214,123,98,0.1)" strokeWidth="1" />
                                <circle cx="185" cy="60" r="10" fill="rgba(214,123,98,0.04)" />
                            </svg>
                            <div className="deco-line terracotta"></div>
                        </div>
                        <div className="card-top">
                            <div className="icon-badge icon-badge-terracotta">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                            <h3 className="bento-card-title">Personal Finance</h3>
                            <p className="bento-card-desc">Set monthly budgets, track spending, and get alerts when you overshoot. Room Sync keeps everything linked.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag terracotta-tag">
                                    <span className="chip-dot terracotta-dot"></span>
                                    Budget Alerts
                                </span>
                                <span className="chip-tag terracotta-tag">
                                    <span className="chip-dot terracotta-dot"></span>
                                    Room Sync
                                </span>
                            </div>
                        </div>
                        <div className="card-bottom-image">
                            <img src="/assets/screenshot/Personal_Wallet.png" alt="Personal finance dashboard with budget tracking" />
                        </div>
                    </div>

                    {/* 5. Smart Dashboard */}
                    <div className="bento-card bg-primary-tint border-primary group reveal">
                        <div className="card-deco">
                            <svg className="deco-abstract" viewBox="0 0 200 200" fill="none">
                                <path d="M160 20 L180 60 L140 60 Z" fill="rgba(139,92,246,0.06)" />
                                <path d="M170 50 L190 90 L150 90 Z" fill="rgba(139,92,246,0.04)" />
                                <circle cx="155" cy="80" r="15" fill="rgba(139,92,246,0.03)" />
                            </svg>
                            <div className="deco-dots purple">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="icon-badge icon-badge-purple">
                                <span className="material-symbols-outlined">dashboard</span>
                            </div>
                            <h3 className="bento-card-title">Smart Dashboard</h3>
                            <p className="bento-card-desc">See rooms, members, tasks & balances at a glance. Your home command center.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag purple-tag">
                                    <span className="chip-dot purple-dot"></span>
                                    Real-time
                                </span>
                                <span className="chip-tag purple-tag">
                                    <span className="chip-dot purple-dot"></span>
                                    Multi-room
                                </span>
                            </div>
                        </div>
                        <div className="card-bottom-image">
                            <img src="/assets/screenshot/Dashboard_new.png" alt="Main app dashboard showing rooms and stats" />
                        </div>
                    </div>

                    {/* 6. Trip Wallet */}
                    <div className="bento-card bg-soft-cream border-neutral group reveal">
                        <div className="card-deco">
                            <svg className="deco-plane" viewBox="0 0 200 200" fill="none">
                                <path d="M140 30 Q180 60 160 100 Q140 140 180 160" stroke="rgba(124,144,112,0.1)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                                <circle cx="140" cy="30" r="4" fill="rgba(124,144,112,0.15)" />
                                <circle cx="180" cy="160" r="4" fill="rgba(124,144,112,0.15)" />
                            </svg>
                        </div>
                        <div className="card-top">
                            <div className="icon-badge icon-badge-sage">
                                <span className="material-symbols-outlined">flight_takeoff</span>
                            </div>
                            <h3 className="bento-card-title">Trip Wallet</h3>
                            <p className="bento-card-desc">Going on a trip? Create a shared wallet, split travel expenses, and settle up when you're back.</p>
                            <div className="badge-wrapper">
                                <span className="chip-tag sage-tag">
                                    <span className="chip-dot sage-dot"></span>
                                    Group Split
                                </span>
                                <span className="chip-tag sage-tag">
                                    <span className="chip-dot sage-dot"></span>
                                    Settle Up
                                </span>
                            </div>
                        </div>
                        <div className="card-bottom-image">
                            <img src="/assets/screenshot/Trips.png" alt="Trip wallet for shared travel expenses" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesBento

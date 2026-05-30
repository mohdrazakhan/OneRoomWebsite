import { useState, useEffect, useRef } from 'react'
import './Stats.css'
import statsService from '../services/statsService'

function Stats() {
    const [counts, setCounts] = useState({
        users: 0,
        expensesCount: 0,
        expensesAmount: 0,
        bugs: 0,
        rating: 0,
        downloads: 0
    })
    const [targets, setTargets] = useState({
        users: 0,
        expensesCount: 0,
        expensesAmount: 0,
        bugs: 0,
        rating: 0,
        downloads: 0
    })
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const statsRef = useRef(null)

    // Fetch real data from Firebase
    useEffect(() => {
        let unsubscribe;

        const fetchStats = async () => {
            try {
                unsubscribe = statsService.subscribeToStats((data) => {
                    setTargets({
                        users: data.activeUsers || 0,
                        expensesCount: data.totalExpensesCount || 0,
                        expensesAmount: data.expensesTracked || 0,
                        bugs: data.bugReports || 0,
                        rating: data.appRating !== undefined ? Number(data.appRating) : 4.8,
                        downloads: data.totalDownloads || 0
                    })
                    setIsLoading(false)
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
                setIsLoading(false)
            }
        }

        fetchStats()

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated && !isLoading) {
                    animateCounters()
                    setHasAnimated(true)
                }
            },
            { threshold: 0.2 }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated, isLoading, targets])

    const animateCounters = () => {
        const duration = 2000
        const steps = 60
        const interval = duration / steps

        let step = 0
        const timer = setInterval(() => {
            step++
            const progress = step / steps

            setCounts({
                users: Math.floor(targets.users * progress),
                expensesCount: Math.floor(targets.expensesCount * progress),
                expensesAmount: Math.floor(targets.expensesAmount * progress),
                bugs: Math.floor(targets.bugs * progress),
                rating: Number((targets.rating * progress).toFixed(1)),
                downloads: Math.floor(targets.downloads * progress)
            })

            if (step >= steps) {
                clearInterval(timer)
                setCounts(targets)
            }
        }, interval)
    }

    const formatNumber = (num) => {
        if (num === undefined || num === null) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
        return num.toString()
    }

    return (
        <section className="stats-section" ref={statsRef}>
            <div className="container">
                <div className="live-indicator-wrapper">
                    <div className="live-indicator">
                        <span className="live-dot"></span>
                        <span className="live-text">LIVE</span>
                    </div>
                </div>

                {/* Global Gradients for Consistent Vector Icons */}
                <svg style={{ display: 'none' }}>
                    <defs>
                        <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#EC407A" />
                        </linearGradient>
                        <linearGradient id="expensesAddedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D67B62" />
                            <stop offset="100%" stopColor="#F43F5E" />
                        </linearGradient>
                        <linearGradient id="expensesTrackedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7C9070" />
                            <stop offset="100%" stopColor="#0D9488" />
                        </linearGradient>
                        <linearGradient id="bugsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FB923C" />
                            <stop offset="100%" stopColor="#D67B62" />
                        </linearGradient>
                        <linearGradient id="ratingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                        <linearGradient id="downloadsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="stats-grid">
                    {/* Active Users */}
                    <div className="stat-card reveal">
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#usersGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" opacity="var(--svg-opacity-half, 0.55)" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" opacity="var(--svg-opacity-half, 0.55)" />
                        </svg>
                        <div className="stat-value">{formatNumber(counts.users)}</div>
                        <div className="stat-label">Active Users</div>
                    </div>

                    {/* Expenses Added */}
                    <div className="stat-card reveal" style={{ animationDelay: '0.1s' }}>
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#expensesAddedGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="10" y1="9" x2="8" y2="9" opacity="var(--svg-opacity-half, 0.55)" />
                        </svg>
                        <div className="stat-value">{formatNumber(counts.expensesCount)}</div>
                        <div className="stat-label">Expenses Added</div>
                    </div>

                    {/* Expenses Tracked */}
                    <div className="stat-card reveal" style={{ animationDelay: '0.2s' }}>
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#expensesTrackedGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        <div className="stat-value">₹{formatNumber(counts.expensesAmount)}</div>
                        <div className="stat-label">Expenses Tracked</div>
                    </div>

                    {/* Bug Reports */}
                    <div className="stat-card reveal" style={{ animationDelay: '0.3s' }}>
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#bugsGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="9" width="12" height="11" rx="3" />
                            <path d="M12 9V5M9 5a3 3 0 0 1 6 0" />
                            <path d="M6 12H3M6 16H2M18 12h3M18 16h2" />
                        </svg>
                        <div className="stat-value">{formatNumber(counts.bugs)}</div>
                        <div className="stat-label">Bug Reports</div>
                    </div>

                    {/* App Rating */}
                    <div className="stat-card reveal" style={{ animationDelay: '0.4s' }}>
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#ratingGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <div className="stat-value">{counts.rating.toFixed(1)}</div>
                        <div className="stat-label">App Rating</div>
                    </div>

                    {/* Downloads */}
                    <div className="stat-card reveal" style={{ animationDelay: '0.5s' }}>
                        <svg className="stat-vector" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--svg-stroke, url(#downloadsGrad))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <div className="stat-value">{formatNumber(counts.downloads)}+</div>
                        <div className="stat-label">Downloads</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats

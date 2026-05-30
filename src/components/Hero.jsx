import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import statsService from '../services/statsService'
import { t } from '../utils/i18n'

function Hero() {
    const [particles, setParticles] = useState([])
    const [stats, setStats] = useState({
        activeUsers: '0+',
        appRating: '0.0★',
        downloads: '0+'
    })

    useEffect(() => {
        // Generate random particles for background
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }))
        setParticles(newParticles)
    }, [])

    // Fetch real stats from Firebase
    useEffect(() => {
        let unsubscribe;

        const fetchStats = async () => {
            try {
                // Real-time subscription to stats
                unsubscribe = statsService.subscribeToStats((data) => {
                    const formatNumber = (num) => {
                        if (num === undefined || num === null) return '0+';
                        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
                        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
                        return num.toString() + '+'
                    }

                    setStats({
                        activeUsers: formatNumber(data.activeUsers),
                        appRating: `${data.appRating !== undefined ? Number(data.appRating).toFixed(1) : '0.0'}★`,
                        ratingCount: data.ratingCount,
                        downloads: formatNumber(data.totalDownloads)
                    })
                })
            } catch (error) {
                console.error('Error fetching hero stats:', error)
            }
        }

        fetchStats()

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])

    const [showIosPopup, setShowIosPopup] = useState(false)

    const handleIosClick = () => {
        setShowIosPopup(true)
        setTimeout(() => setShowIosPopup(false), 3000)
    }

    return (
        <section id="hero" className="hero">
            {showIosPopup && (
                <div className="ios-popup">
                    <span>🍎</span>
                    <span>{t('Coming Soon ')}</span>
                </div>
            )}
            <div className="particles">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="badge">
                            <span>{t('HARMONY FOR EVERY HOME')}</span>
                        </div>

                        <h1 className="hero-title">
                            {t('Living  together,')}<br />
                            <i style={{ color: 'var(--brand-purple)' }}>{t('simplified.')}</i>
                        </h1>

                        <p className="hero-description">
                            {t('The modern app designed to reduce social friction in shared homes. Automate your household logistics and get back to being friends.')}
                        </p>

                        <div className="hero-buttons">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.oneroom.app&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="btn btn-primary">
                                    <span>{t('Download Now')}</span>
                                </button>
                            </a>
                            <Link to="/how-it-works">
                                <button className="btn btn-outline">
                                    <span className="material-symbols-outlined">{t('play_circle')}</span>
                                    <span>{t('See How It Works')}</span>
                                </button>
                            </Link>
                        </div>

                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-number">
                                    {stats.activeUsers} <span className="stat-live-dot"></span>
                                </div>
                                <div className="stat-label">{t('ACTIVE USERS')}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">
                                    {stats.appRating}{stats.ratingCount || 0}
                                </div>
                                <div className="stat-label">{t('APP RATING')}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">{stats.downloads}</div>
                                <div className="stat-label">{t('DOWNLOADS')}</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="phone-mockup">
                            <img src="/assets/hero-phones.png" alt="OneRoom App Interface" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero

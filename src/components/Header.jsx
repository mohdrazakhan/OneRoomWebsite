import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signInWithGoogle } from '../services/authService'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './Header.css'
import { t } from '../utils/i18n'

function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const handleLogin = async () => {
        try {
            await signInWithGoogle()
            window.location.href = '/app/index.html'
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location])

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '')
            setTimeout(() => {
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        }
    }, [location])

    const isActive = (path) => location.pathname === path

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        <img src="/assets/logo.png" alt="OneRoom Logo" />
                        <span>{t('OneRoom')}</span>
                    </Link>

                    <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <Link to="/" className={isActive('/') ? 'active-link' : ''}>{t('Home')}</Link>
                        <Link to="/features" className={isActive('/features') ? 'active-link' : ''}>{t('Features')}</Link>
                        <Link to="/pricing" className={isActive('/pricing') ? 'active-link' : ''}>{t('Pricing')}</Link>
                        <Link to="/how-it-works" className={isActive('/how-it-works') ? 'active-link' : ''}>{t('How it Works')}</Link>
                        <Link to="/community" className={isActive('/community') ? 'active-link' : ''}>{t('Community')}</Link>
                        
                        <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {user ? (
                                <a href="/app/index.html" className="btn btn-outline login-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>{t('Dashboard')}</a>
                            ) : (
                                <button onClick={handleLogin} className="btn btn-outline login-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>
                                    <span>{t('Continue on web')}</span>
                                </button>
                            )}
                            <a href="https://play.google.com/store/apps/details?id=com.oneroom.app&hl=en" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>{t('Get Started')}</a>
                        </div>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header

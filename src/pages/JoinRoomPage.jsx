import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css' // Import general styles if needed, or rely on index.css

const JoinRoomPage = () => {
    const { roomId } = useParams()
    const [status, setStatus] = useState('Opening OneRoom app...')
    const [showDownload, setShowDownload] = useState(false)

    useEffect(() => {
        if (!roomId) return

        // 1. Try to open the app
        const appScheme = `oneroom://join/${roomId}`
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.oneroom.app&hl=en'

        const startTime = Date.now()

        // Attempt to open the app
        window.location.href = appScheme

        // 2. Fallback check
        const timer = setTimeout(() => {
            const elapsed = Date.now() - startTime

            // If the user is still here after ~2.5s, the app likely didn't open
            if (elapsed < 3000) {
                setStatus('App not installed?')
                setShowDownload(true)

                // Optional: Auto-redirect to store after another delay?
                // For better UX, let them click the button or redirect after another short delay
                // setTimeout(() => {
                //     window.location.href = playStoreUrl
                // }, 2000)
            }
        }, 2500)

        // iOS detection for specific message
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            setTimeout(() => {
                setStatus('iOS app coming soon!')
                setShowDownload(true)
            }, 1000)
        }

        return () => clearTimeout(timer)
    }, [roomId])

    return (
        <main className="page-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px var(--spacing-md)'
        }}>
            <div className="glass bento-shadow" style={{
                padding: '48px 32px',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '480px',
                width: '100%',
                textAlign: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)'
            }}>
                <div style={{
                    fontSize: '60px',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, var(--brand-purple), var(--sage-green))',
                    width: '100px',
                    height: '100px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'white'
                }}>
                    🏠
                </div>

                <h1 style={{ marginBottom: '12px' }}>Join Room</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                    You've been invited to join a room on OneRoom.
                </p>

                {roomId && (
                    <div style={{
                        background: 'var(--bg-low)',
                        padding: '16px 24px',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '32px',
                        border: '2px solid var(--primary-light)'
                    }}>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--brand-purple)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px'
                        }}>Room Code</div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            fontFamily: 'monospace',
                            letterSpacing: '2px',
                            color: 'var(--text-main)'
                        }}>{roomId}</div>
                    </div>
                )}

                {/* Spinner */}
                {!showDownload && (
                    <div className="spinner" style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid var(--border)',
                        borderTop: '4px solid var(--brand-purple)',
                        borderRadius: '50%',
                        margin: '0 auto 24px',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                )}

                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>

                <p style={{ marginBottom: '24px', fontWeight: '500', color: 'var(--text-main)' }}>{status}</p>

                {showDownload && (
                    <a
                        href="https://play.google.com/store/apps/details?id=com.oneroom.app&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{
                            display: 'inline-flex',
                            width: 'auto',
                            padding: '1rem 2rem'
                        }}
                    >
                        {/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Available on Android' : 'Download OneRoom'}
                    </a>
                )}
            </div>
        </main>
    )
}

export default JoinRoomPage

import React, { useState } from 'react'
import './HowItWorksPage.css'
import { t } from '../utils/i18n'

function HowItWorksPage() {
    const [activeStep, setActiveStep] = useState(0)
    const [toastMessage, setToastMessage] = useState('')

    // Toast triggers
    const triggerToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => {
            setToastMessage(prev => prev === msg ? '' : prev)
        }, 3000)
    }

    // Step 1: Flatmates
    const [roommates, setRoommates] = useState([
        { id: 1, name: 'AJ', fullName: 'Abhijit J.', color: 'var(--brand-purple)', bg: 'rgba(139,92,246,0.1)' },
        { id: 2, name: 'MB', fullName: 'Mukul B.', color: 'var(--brand-purple)', bg: 'rgba(139,92,246,0.1)' }
    ])
    const [inviteName, setInviteName] = useState('')

    const addRoommate = () => {
        if (!inviteName.trim()) return
        const names = inviteName.trim().split(' ')
        const initials = names.map(n => n.at(0).toUpperCase()).join('').substring(0, 2)
        const colors = [
            { color: 'var(--terracotta)', bg: 'rgba(214,123,98,0.1)' },
            { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
            { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' }
        ]
        const styling = colors.at(roommates.length % colors.length)
        
        setRoommates([...roommates, {
            id: Date.now(),
            name: initials,
            fullName: inviteName.trim(),
            ...styling
        }])
        setInviteName('')
        triggerToast(t(`Invite sent to ${inviteName}! ✉️`))
    }

    // Step 2: Constitution
    const [rules, setRules] = useState({
        quietHours: true,
        guestNotice: true,
        sharedExpenses: false,
        petFriendly: false
    })

    const toggleRule = (key, name) => {
        if (key === 'quietHours' || key === 'guestNotice' || key === 'sharedExpenses' || key === 'petFriendly') {
            setRules(prev => {
                const next = { ...prev }
                if (key === 'quietHours') next.quietHours = !prev.quietHours
                if (key === 'guestNotice') next.guestNotice = !prev.guestNotice
                if (key === 'sharedExpenses') next.sharedExpenses = !prev.sharedExpenses
                if (key === 'petFriendly') next.petFriendly = !prev.petFriendly
                return next
            })
            let nextVal = false
            if (key === 'quietHours') nextVal = !rules.quietHours
            if (key === 'guestNotice') nextVal = !rules.guestNotice
            if (key === 'sharedExpenses') nextVal = !rules.sharedExpenses
            if (key === 'petFriendly') nextVal = !rules.petFriendly
            triggerToast(t(`Updated rule: ${name} is now ${nextVal ? 'Enabled' : 'Disabled'}`))
        }
    }

    // Step 3: Chores
    const [chores, setChores] = useState([
        { id: 1, task: 'Clean Kitchen', assignee: 'AJ', severity: 'High', status: 'Pending' },
        { id: 2, task: 'Take Out Trash', assignee: 'MB', severity: 'Medium', status: 'Pending' },
        { id: 3, task: 'Buy Detergent', assignee: 'Raza', severity: 'Low', status: 'Completed' }
    ])

    const rotateChores = () => {
        setChores(prev => {
            const assignees = prev.map(c => c.assignee)
            // Shift assignees by 1
            const shifted = [...assignees.slice(1), assignees.at(0)]
            return prev.map((c, i) => ({
                ...c,
                assignee: shifted.at(i),
                status: c.task === 'Buy Detergent' ? 'Completed' : 'Pending'
            }))
        })
        triggerToast(t('Chores rotated! Check your new assignments.'))
    }

    const toggleChoreStatus = (id) => {
        setChores(prev => prev.map(c => {
            if (c.id === id) {
                const nextStatus = c.status === 'Completed' ? 'Pending' : 'Completed'
                return { ...c, status: nextStatus }
            }
            return c
        }))
        triggerToast(t('Chore status updated!'))
    }

    const nudgeRoommate = (name, task) => {
        triggerToast(t(`Sent a friendly, automated nudge to ${name} for "${task}"! 💬`))
    }

    // Step 4: Expenses
    const [expenses, setExpenses] = useState([
        { id: 1, desc: 'Wifi Internet', amount: 999, paidBy: 'AJ' },
        { id: 2, desc: 'Milk & Eggs', amount: 150, paidBy: 'MB' }
    ])
    const [expDesc, setExpDesc] = useState('')
    const [expAmt, setExpAmt] = useState('')
    const [expPayer, setExpPayer] = useState('AJ')

    const addExpense = () => {
        if (!expDesc.trim() || !expAmt) return
        const amt = parseFloat(expAmt)
        if (isNaN(amt) || amt <= 0) return

        setExpenses([{
            id: Date.now(),
            desc: expDesc,
            amount: amt,
            paidBy: expPayer
        }, ...expenses])

        setExpDesc('')
        setExpAmt('')
        triggerToast(t(`Logged ₹${amt} for ${expDesc}. Split equally! 💰`))
    }

    const clearExpenses = () => {
        setExpenses([])
        triggerToast(t('All expenses cleared & settled! 🤝'))
    }

    // Calculate mock balances
    const payersList = ['AJ', 'MB', 'Raza', ...roommates.filter(r => r.name !== 'AJ' && r.name !== 'MB').map(r => r.name)]
    const getBalances = () => {
        const balances = new Map()
        payersList.forEach(p => { balances.set(p, 0) })
        
        let total = 0
        expenses.forEach(e => {
            total += e.amount
            const currentVal = balances.get(e.paidBy) || 0
            balances.set(e.paidBy, currentVal + e.amount)
        })

        const share = total / payersList.length
        payersList.forEach(p => {
            const currentVal = balances.get(p) || 0
            balances.set(p, parseFloat((currentVal - share).toFixed(1)))
        })

        return balances
    }

    const activeBalances = getBalances()

    // Step 4 Sub-Tabs & Media/Personal Wallet states
    const [step4SubTab, setStep4SubTab] = useState('split') // 'split', 'trip', 'wallet'
    const [tripMedia, setTripMedia] = useState([
        { id: 1, type: 'image', name: 'beach_selfie.jpg', size: '2.4 MB', uploadedBy: 'AJ' },
        { id: 2, type: 'video', name: 'bonfire_night.mp4', size: '14.8 MB', uploadedBy: 'Raza' }
    ])
    const [personalTransactions, setPersonalTransactions] = useState([
        { id: 1, desc: 'WiFi split (Sync)', amount: -333, source: 'Greenwood Room' },
        { id: 2, desc: 'Travel split (Sync)', amount: -900, source: 'Goa Roadtrip' },
        { id: 3, desc: 'Tiffin Dinner', amount: -150, source: 'Personal Wallet' }
    ])
    
    const personalBudget = 5000
    const personalSpent = Math.abs(personalTransactions.reduce((acc, t) => acc + t.amount, 0))

    const simulateMediaUpload = () => {
        const fileNames = ['sunset_group.jpg', 'trek_climb.mp4', 'cafe_lunch.jpg', 'camp_tent.jpg']
        const randomName = fileNames.at(Math.floor(Math.random() * fileNames.length))
        const randomSize = (Math.random() * 5 + 1).toFixed(1) + ' MB'
        
        setTripMedia(prev => [
            {
                id: Date.now(),
                type: randomName.endsWith('.mp4') ? 'video' : 'image',
                name: randomName,
                size: randomSize,
                uploadedBy: 'You'
            },
            ...prev
        ])
        triggerToast(t(`Simulated upload of ${randomName}! 📸`))
    }

    const stepData = [
        {
            title: "Gather the House",
            subtitle: "Download the app and create your room in seconds.",
            description: "Simply install the OneRoom app, create a new room for your household, and share the secure invite link or let roommates scan your QR code to bring everyone into a single digital home.",
            bullets: [
                "Install app & instantly create room",
                "Add roommates via secure link",
                "Scan room QR code to join in seconds"
            ],
            badgeText: "Step 01 • Get Started",
            badgeColor: "rgba(139, 92, 246, 0.1)",
            badgeTextColor: "var(--brand-purple)"
        },
        {
            title: "Set Your Constitution",
            subtitle: "Agree on quiet hours, visitors, and supplies together.",
            description: "Draft your house constitution with explicit guidelines for quiet hours, guest notice periods, and shared house supplies. House rules are signed off by all roommates, preventing misunderstandings.",
            bullets: [
                "Establish quiet hours & guest rules",
                "Set guidelines for shared house supplies",
                "Formal flatmate sign-offs & agreement"
            ],
            badgeText: "Step 02 • Agreement",
            badgeColor: "rgba(214, 123, 98, 0.1)",
            badgeTextColor: "var(--terracotta)"
        },
        {
            title: "Manage Shared Tasks",
            subtitle: "Assign chores fairly and auto-rotate them dynamically.",
            description: "Set up chores for cleaning, trash duty, and groceries. Auto-rotate tasks daily or weekly so workloads are distributed fairly. Send automated gentle 'Nudge' notifications when tasks are due.",
            bullets: [
                "Create tasks for cleaning & groceries",
                "Auto-rotate chores daily or weekly",
                "Send automated, friendly 'Nudges'"
            ],
            badgeText: "Step 03 • Action & Chores",
            badgeColor: "rgba(124, 144, 112, 0.1)",
            badgeTextColor: "var(--sage)"
        },
        {
            title: "Manage Ledgers & Wallet Sync",
            subtitle: "Track shared bills, share travel memories, and sync personal budgets.",
            description: "Log shared bills and split costs. If you go on a trip, create a Trip Wallet to track travel expenses on the go. Share photos/videos in the trip's media folder (stored for 30 days so members can download before auto-deletion to optimize device storage). Maintain your Personal Wallet with Auto-Sync across active rooms and trips.",
            bullets: [
                "Trip wallets & shared bill splitting",
                "Shared trip media folder (30-day retention)",
                "Personal Wallet with Auto-Sync across rooms & trips"
            ],
            badgeText: "Step 04 • Ledger & Sync",
            badgeColor: "rgba(139, 92, 246, 0.1)",
            badgeTextColor: "var(--brand-purple)"
        }
    ]

    const currentStepData = stepData.at(activeStep)

    return (
        <main className="page-container reveal-on-scroll is-visible">
            <div className="container">
                
                {/* Hero Page Header */}
                <header className="how-works-header">
                    <span className="inline-block px-4 py-1.5 mb-6 bg-primary-light text-primary font-label-md rounded-full">
                        {t('How it Works')}
                    </span>
                    <h1>{t('Transforming shared living into a ')}<span className="text-gradient">{t('community.')}</span></h1>
                    <p className="font-body-lg">
                        {t('OneRoom uses intuitive bento layouts, step-by-step constitutions, and automatic nudges to keep your home running smoothly. Take a tour of the app features below!')}
                    </p>
                </header>

                {/* Stepper Navigation (Pager Indicator) */}
                <div className="stepper-navigation-bar bento-shadow">
                    <div className="stepper-progress-track">
                        <div 
                            className="stepper-progress-fill" 
                            style={{ width: `${(activeStep / (stepData.length - 1)) * 100}%` }}
                        />
                    </div>
                    {stepData.map((step, idx) => (
                        <button
                            key={idx}
                            className={`stepper-nav-node ${idx === activeStep ? 'active' : ''} ${idx < activeStep ? 'completed' : ''}`}
                            onClick={() => setActiveStep(idx)}
                        >
                            <div className="node-circle">{idx + 1}</div>
                            <span className="node-title">{t(step.title.split(' ').at(0))}</span>
                        </button>
                    ))}
                </div>

                {/* Interactive Pager Container */}
                <div className="pager-interactive-section">
                    
                    {/* Toast Notification */}
                    {toastMessage && (
                        <div className="pager-toast">
                            <span className="material-symbols-outlined">{t('info')}</span>
                            <span>{toastMessage}</span>
                        </div>
                    )}

                    {/* Step Row */}
                    <div className="step-row">
                        
                        {/* Left: Content Information */}
                        <div className="step-text-block">
                            <span 
                                className="step-pill"
                                style={{ background: currentStepData.badgeColor, color: currentStepData.badgeTextColor }}
                            >
                                {t(currentStepData.badgeText)}
                            </span>
                            <h2>{t(currentStepData.title)}</h2>
                            <h3>{t(currentStepData.subtitle)}</h3>
                            <p>{t(currentStepData.description)}</p>
                            
                            <ul className="step-list">
                                {currentStepData.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>
                                        <span className="material-symbols-outlined">{t('check_circle')}</span>
                                        <span>{t(bullet)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pager-navigation-buttons">
                                <button 
                                    className="btn btn-outline" 
                                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                                    disabled={activeStep === 0}
                                >
                                    {t('Previous')}
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        if (activeStep < stepData.length - 1) {
                                            setActiveStep(prev => prev + 1)
                                        } else {
                                            triggerToast(t("Interactive Tour Complete! Download the app to get started."))
                                        }
                                    }}
                                >
                                    {activeStep === stepData.length - 1 ? t('Finish Tour') : t('Next Step')}
                                </button>
                            </div>
                        </div>

                        {/* Right: Live Interactive Sandbox Dashboard */}
                        <div className="step-visual-block">
                            <div className="illustration-card bento-shadow">
                                
                                {/* Step 01: Invites Sandbox */}
                                {activeStep === 0 && (
                                    <div className="invite-panel">
                                        <h3>{t('Invite Flatmates')}</h3>
                                        <div className="avatars-row">
                                            {roommates.map((r) => (
                                                <div 
                                                    key={r.id} 
                                                    className="avatar-initial"
                                                    style={{ background: r.bg, color: r.color }}
                                                    title={r.fullName}
                                                >
                                                    {r.name}
                                                </div>
                                            ))}
                                            <div className="avatar-initial add-btn" title={t('Add roommate')}>
                                                <span className="material-symbols-outlined">{t('add')}</span>
                                            </div>
                                        </div>

                                        <div className="invite-input-group">
                                            <input 
                                                type="text" 
                                                placeholder={t('Enter full name...')}
                                                value={inviteName}
                                                onChange={e => setInviteName(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && addRoommate()}
                                            />
                                            <button className="btn btn-primary" onClick={addRoommate}>
                                                {t('Send Link')}
                                            </button>
                                        </div>
                                        <p className="invite-helper">{t('Type a name above and click send to simulate an invite.')}</p>
                                    </div>
                                )}

                                {/* Step 02: Constitution Sandbox */}
                                {activeStep === 1 && (
                                    <div className="constitution-panel">
                                        <h3>{t('House Constitution')}</h3>
                                        
                                        <div className="const-row" onClick={() => toggleRule('quietHours', t('Quiet Hours (10 PM - 7 AM)'))}>
                                            <div className="const-info">
                                                <h4>{t('Quiet Hours')}</h4>
                                                <p>{t('10:00 PM - 7:00 AM')}</p>
                                            </div>
                                            <div className={`const-toggle-switch ${rules.quietHours ? 'on' : 'off'}`}>
                                                <div className="const-toggle-knob" />
                                            </div>
                                        </div>
                                        
                                        <div className="const-row" onClick={() => toggleRule('guestNotice', t('Guest Policy (24h notify)'))}>
                                            <div className="const-info">
                                                <h4>{t('Guest Policy')}</h4>
                                                <p>{t('Notify flatmates 24h in advance')}</p>
                                            </div>
                                            <div className={`const-toggle-switch ${rules.guestNotice ? 'on' : 'off'}`}>
                                                <div className="const-toggle-knob" />
                                            </div>
                                        </div>

                                        <div className="const-row" onClick={() => toggleRule('sharedExpenses', t('Split toilet paper/cleaning products'))}>
                                            <div className="const-info">
                                                <h4>{t('Shared House Supplies')}</h4>
                                                <p>{t('toilet paper & detergent split equally')}</p>
                                            </div>
                                            <div className={`const-toggle-switch ${rules.sharedExpenses ? 'on' : 'off'}`}>
                                                <div className="const-toggle-knob" />
                                            </div>
                                        </div>

                                        <div className="const-status-banner">
                                            <span className="material-symbols-outlined">
                                                {Object.values(rules).filter(Boolean).length >= 2 ? 'verified' : 'hourglass_empty'}
                                            </span>
                                            <span>
                                                {Object.values(rules).filter(Boolean).length} / {Object.keys(rules).length} {t('rules signed off')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Step 03: Chores Sandbox */}
                                {activeStep === 2 && (
                                    <div className="chores-sandbox-panel">
                                        <div className="sandbox-panel-header">
                                            <h3>{t('Room Chore Board')}</h3>
                                            <button className="btn btn-outline rotate-btn" onClick={rotateChores}>
                                                <span className="material-symbols-outlined">{t('loop')}</span>
                                                {t('Rotate Chores')}
                                            </button>
                                        </div>

                                        <div className="chores-list">
                                            {chores.map((c) => (
                                                <div key={c.id} className={`chore-item-row ${c.status === 'Completed' ? 'completed' : ''}`}>
                                                    <button 
                                                        className="chore-checkbox"
                                                        onClick={() => toggleChoreStatus(c.id)}
                                                    >
                                                        {c.status === 'Completed' ? (
                                                            <span className="material-symbols-outlined checked">{t('check_circle')}</span>
                                                        ) : (
                                                            <span className="material-symbols-outlined unchecked">{t('radio_button_unchecked')}</span>
                                                        )}
                                                    </button>
                                                    <div className="chore-info">
                                                        <h4>{t(c.task)}</h4>
                                                        <div className="chore-tags">
                                                            <span className={`chore-badge assignee`}>👤 {t(c.assignee)}</span>
                                                            <span className={`chore-badge severity ${c.severity.toLowerCase()}`}>{t(c.severity)} {t('Priority')}</span>
                                                        </div>
                                                    </div>
                                                    {c.status !== 'Completed' && (
                                                        <button 
                                                            className="nudge-button" 
                                                            onClick={() => nudgeRoommate(c.assignee, c.task)}
                                                            title={t(`Send nudge to ${c.assignee}`)}
                                                        >
                                                            <span className="material-symbols-outlined">{t('notifications_active')}</span>
                                                            <span>{t('Nudge')}</span>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 04: Expenses Ledger Sandbox */}
                                {activeStep === 3 && (
                                    <div className="expenses-sandbox-panel">
                                        <div className="step4-subtabs-row">
                                            <button 
                                                className={`step4-tab-btn ${step4SubTab === 'split' ? 'active' : ''}`}
                                                onClick={() => setStep4SubTab('split')}
                                            >
                                                <span className="material-symbols-outlined">{t('payments')}</span>
                                                {t('Bill Split')}
                                            </button>
                                            <button 
                                                className={`step4-tab-btn ${step4SubTab === 'trip' ? 'active' : ''}`}
                                                onClick={() => setStep4SubTab('trip')}
                                            >
                                                <span className="material-symbols-outlined">{t('folder_shared')}</span>
                                                {t('Trip Media')}
                                            </button>
                                            <button 
                                                className={`step4-tab-btn ${step4SubTab === 'wallet' ? 'active' : ''}`}
                                                onClick={() => setStep4SubTab('wallet')}
                                            >
                                                <span className="material-symbols-outlined">{t('account_balance_wallet')}</span>
                                                {t('Personal Wallet')}
                                            </button>
                                        </div>

                                        {step4SubTab === 'split' && (
                                            <div className="sandbox-split-layout">
                                                {/* Left side: Log Expense */}
                                                <div className="expense-log-box">
                                                    <h4>{t('Add Expense')}</h4>
                                                    <input 
                                                        type="text" 
                                                        placeholder={t('Description (e.g. WiFi)')} 
                                                        value={expDesc}
                                                        onChange={e => setExpDesc(e.target.value)}
                                                    />
                                                    <div className="row-inputs">
                                                        <input 
                                                            type="number" 
                                                            placeholder={t('Amount (₹)')} 
                                                            value={expAmt}
                                                            onChange={e => setExpAmt(e.target.value)}
                                                        />
                                                        <select 
                                                            value={expPayer}
                                                            onChange={e => setExpPayer(e.target.value)}
                                                        >
                                                            {payersList.map((p, idx) => (
                                                                <option key={idx} value={p}>{p}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button className="btn btn-primary btn-block" onClick={addExpense}>
                                                        {t('Log & Split')}
                                                    </button>
                                                </div>

                                                {/* Right side: Balances Ledger */}
                                                <div className="balances-ledger-box">
                                                    <div className="ledger-header">
                                                        <h4>{t('Room Ledger')}</h4>
                                                        <button className="btn-settle" onClick={clearExpenses}>
                                                            {t('Settle Up')}
                                                        </button>
                                                    </div>
                                                    <div className="balances-list">
                                                        {Array.from(activeBalances.entries()).map(([member, bal]) => (
                                                            <div key={member} className={`balance-row-item ${bal >= 0 ? 'positive' : 'negative'}`}>
                                                                 <span className="member-name">👤 {member}</span>
                                                                 <span className="member-bal-amount">
                                                                     {bal >= 0 ? t(`Gets back ₹${bal}`) : t(`Owes ₹${Math.abs(bal)}`)}
                                                                 </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {step4SubTab === 'trip' && (
                                            <div className="trip-media-sandbox">
                                                <div className="trip-media-header">
                                                    <div>
                                                        <h4>{t('Goa Trip Shared Folder')}</h4>
                                                        <p className="media-note">
                                                            {t('⚠️ Photos/videos automatically delete after 30 days. Download what you want to keep!')}
                                                        </p>
                                                    </div>
                                                    <button className="btn btn-outline upload-media-btn" onClick={simulateMediaUpload}>
                                                        <span className="material-symbols-outlined">{t('upload')}</span>
                                                        {t('Upload')}
                                                    </button>
                                                </div>
                                                <div className="media-files-grid">
                                                    {tripMedia.map(m => (
                                                        <div key={m.id} className="media-file-card">
                                                            <div className="file-preview-icon">
                                                                <span className="material-symbols-outlined">
                                                                    {m.type === 'video' ? 'movie' : 'image'}
                                                                </span>
                                                            </div>
                                                            <div className="file-info">
                                                                <span className="file-name">{t(m.name)}</span>
                                                                <span className="file-meta">{t(m.size)} • {t('by')} {t(m.uploadedBy)}</span>
                                                            </div>
                                                            <button 
                                                                className="file-download-btn"
                                                                onClick={() => triggerToast(t(`Downloading "${m.name}"...`))}
                                                                title={t('Download photo')}
                                                            >
                                                                <span className="material-symbols-outlined">{t('download')}</span>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {step4SubTab === 'wallet' && (
                                            <div className="personal-wallet-sandbox">
                                                <div className="wallet-sync-header">
                                                    <h4>{t('Personal Budget Sync')}</h4>
                                                    <span className="sync-status-badge">
                                                        <span className="pulse-dot"></span>
                                                        {t('Auto-Synced')}
                                                    </span>
                                                </div>
                                                
                                                <div className="wallet-progress-container">
                                                    <div className="wallet-stats-row">
                                                        <span>{t('Spent: ')}<strong>₹{personalSpent}</strong></span>
                                                        <span>{t('Limit: ')}<strong>₹{personalBudget}</strong></span>
                                                    </div>
                                                    <div className="wallet-progress-bar">
                                                        <div 
                                                            className="wallet-progress-fill" 
                                                            style={{ width: `${(personalSpent / personalBudget) * 100}%` }}
                                                        />
                                                    </div>
                                                    <p className="sync-helper-text">
                                                        {t('* Transactions in Greenwood Room and Goa Roadtrip are synced automatically.')}
                                                    </p>
                                                </div>

                                                <div className="wallet-transactions-list">
                                                    {personalTransactions.map(t => (
                                                        <div key={t.id} className="wallet-trans-item">
                                                            <div className="trans-desc-col">
                                                                <span className="trans-desc">{t(t.desc)}</span>
                                                                <span className="trans-source">{t('Source: ')}{t(t.source)}</span>
                                                            </div>
                                                            <span className="trans-amount">{t.amount >= 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}

export default HowItWorksPage

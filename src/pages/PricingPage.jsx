import React, { useState } from 'react'
import './PricingPage.css'
import { t } from '../utils/i18n'

function PricingPage() {
    const [isYearly, setIsYearly] = useState(false)
    const [openFAQ, setOpenFAQ] = useState({
        0: false,
        1: true, // Default open the second one as in Stitch mockup
        2: false
    })

    const toggleFAQ = (index) => {
        const idx = Number(index)
        if (idx >= 0 && idx < 3) {
            setOpenFAQ(prev => ({
                ...prev,
                [idx]: !prev[idx]
            }))
        }
    }

    const priceHarmony = isYearly ? '₹15.2' : '₹19'
    const priceMansion = isYearly ? '₹23.2' : '₹29'

    return (
        <main className="page-container reveal-on-scroll is-visible">
            <div className="container">

                {/* Hero Header */}
                <header className="pricing-header">
                    <span className="inline-block px-4 py-1.5 mb-6 bg-primary-light text-primary font-label-md rounded-full">
                        {t('Transparent Pricing')}
                    </span>
                    <h1>{t('Simple plans for ')}<span className="text-gradient">{t('happy homes')}</span></h1>
                    <p>
                        {t("Whether you're a dynamic duo or a bustling household, we have the right tools to keep your living space harmonious and stress-free.")}
                    </p>

                    {/* Toggle Switch */}
                    <div className="billing-toggle-container">
                        <span className={`toggle-label ${!isYearly ? 'text-main' : ''}`}>{t('Monthly')}</span>
                        <button
                            className={`toggle-switch-btn ${isYearly ? 'active' : ''}`}
                            onClick={() => setIsYearly(!isYearly)}
                            aria-label="Toggle billing interval"
                        >
                            <div className="toggle-knob" />
                        </button>
                        <span className={`toggle-label ${isYearly ? 'text-main' : ''}`}>
                            {t('Yearly')}
                            <span className="discount-tag">{t('Save 20%')}</span>
                        </span>
                    </div>
                </header>

                {/* Promo Offer Banner */}
                <div className="pricing-promo-wrapper">
                    <div className="pricing-promo-banner bento-shadow">
                        <span className="material-symbols-outlined">{t('auto_awesome')}</span>
                        <p>{t('Limited Time Offer: All Premium Features are currently FREE!')}</p>
                    </div>
                </div>

                {/* Pricing Grid */}
                <section className="pricing-grid">
                    {/* Tier: Duo */}
                    <div className="pricing-card group">
                        <div className="mb-4">
                            <h3 className="pricing-card-title">{t('Duo')}</h3>
                            <p className="pricing-card-desc">{t('Perfect for partners or pairs sharing a space.')}</p>
                        </div>
                        <div className="pricing-card-price">
                            <span className="current-price">{t('₹0.00')}</span>
                            <span className="price-suffix">{t('/forever')}</span>
                        </div>
                        <ul className="pricing-features-list">
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('2 Rooms')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Expense Tracking')}</span>
                            </li>
                            <li className="opacity-50">
                                <span className="material-symbols-outlined feature-block">{t('block')}</span>
                                <span>{t('Limited Chore Sets')}</span>
                            </li>
                        </ul>
                        <button className="btn btn-outline">{t('Get Started')}</button>
                    </div>

                    {/* Tier: Harmony (Popular) */}
                    <div className="pricing-card popular">
                        <div className="popular-badge">{t('🔥 Most Popular')}</div>
                        <div className="mb-4">
                            <h3 className="pricing-card-title">{t('Harmony')}</h3>
                            <p className="pricing-card-desc">{t('Our most loved plan for standard households.')}</p>
                        </div>
                        <div className="pricing-card-price">
                            <span className="old-price">{priceHarmony}</span>
                            <span className="current-price">{t('₹0.00')}</span>
                            <span className="price-suffix">{t('/mo')}</span>
                        </div>
                        <ul className="pricing-features-list">
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Up to 5 Rooms')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Pro Expense Tracking')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Unlimited Chore Management')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('House Constitution Builder')}</span>
                            </li>
                        </ul>
                        <button className="btn btn-primary">{t('Choose Harmony')}</button>
                    </div>

                    {/* Tier: Mansion */}
                    <div className="pricing-card group">
                        <div className="mb-4">
                            <h3 className="pricing-card-title">{t('Mansion')}</h3>
                            <p className="pricing-card-desc">{t('Scaleable solution for large co-living spaces.')}</p>
                        </div>
                        <div className="pricing-card-price">
                            <span className="old-price">{priceMansion}</span>
                            <span className="current-price">{t('₹0.00')}</span>
                            <span className="price-suffix">{t('/mo')}</span>
                        </div>
                        <ul className="pricing-features-list">
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Unlimited Roommates')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Custom House Branding')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('Priority Concierge Support')}</span>
                            </li>
                            <li>
                                <span className="material-symbols-outlined feature-check">{t('check_circle')}</span>
                                <span>{t('All Harmony Features')}</span>
                            </li>
                        </ul>
                        <button className="btn btn-outline">{t('Go Big')}</button>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="faq-section">
                    <h2 className="faq-title">{t('Questions you might have')}</h2>
                    <div className="faq-list">

                        {/* Question 1 */}
                        <div className={`faq-item ${openFAQ[0] ? 'open' : ''}`}>
                            <button className="faq-question-btn" onClick={() => toggleFAQ(0)}>
                                <h4>{t('Can I change my plan later?')}</h4>
                                <span className="material-symbols-outlined">{t('expand_more')}</span>
                            </button>
                            {openFAQ[0] && (
                                <div className="faq-answer">
                                    {t('Yes, absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, the new features are available instantly.')}
                                </div>
                            )}
                        </div>

                        {/* Question 2 */}
                        <div className={`faq-item ${openFAQ[1] ? 'open' : ''}`}>
                            <button className="faq-question-btn" onClick={() => toggleFAQ(1)}>
                                <h4>{t('Is there a limit on how many houses I can manage?')}</h4>
                                <span className="material-symbols-outlined">{t('expand_more')}</span>
                            </button>
                            {openFAQ[1] && (
                                <div className="faq-answer">
                                    {t('OneRoom is per-household. If you manage multiple properties or shared spaces, you can create a unique space for each and manage them with a single account switcher.')}
                                </div>
                            )}
                        </div>

                        {/* Question 3 */}
                        <div className={`faq-item ${openFAQ[2] ? 'open' : ''}`}>
                            <button className="faq-question-btn" onClick={() => toggleFAQ(2)}>
                                <h4>{t('What happens if a roommate leaves?')}</h4>
                                <span className="material-symbols-outlined">{t('expand_more')}</span>
                            </button>
                            {openFAQ[2] && (
                                <div className="faq-answer">
                                    {t('You can easily remove members and archive their history. If your group size drops into a lower tier, you can switch plans at the end of your billing cycle.')}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="faq-footer">
                        <p>{t('Still have questions?')}</p>
                        <a href="mailto:support@oneroom.app">{t('Contact our support team')}</a>
                    </div>
                </section>

            </div>
        </main>
    )
}

export default PricingPage

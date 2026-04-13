function SupportPage() {
    return (
        <main className="page-container" style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '80vh' }}>
            <div className="container">
                <div className="page-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1>Support Center</h1>
                    <p className="subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>We're here to help you get the most out of OneRoom.</p>
                </div>

                <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto 4rem' }}>
                    <div className="support-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border)' }}>
                        <h3>Contact Support</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Have a specific issue or found a bug? Our support team is ready to assist you.</p>
                        <a href="mailto:care.oneroom@gmail.com" className="btn btn-primary" style={{ marginBottom: '1rem' }}>Email Us</a>
                        <p style={{ marginTop: '1rem', fontWeight: '500' }}>Call/WhatsApp: +91 8279677833</p>
                    </div>

                    <div className="support-card" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border)' }}>
                        <h3>General Inquiries</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For partnership opportunities or general questions about the company.</p>
                        <a href="mailto:care.oneroom@gmail.com" className="btn btn-outline">Contact Info</a>
                    </div>
                </div>

                <section className="faq-preview" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <h2>Common Topics</h2>
                    <ul className="topic-list" style={{ listStyle: 'none', textAlign: 'left', marginTop: '2rem' }}>
                        {['Account Management', 'Billing & Subscriptions', 'Roommate Invites', 'Chores & Tasks Setup', 'Expense Splitting Logic'].map(topic => (
                            <li key={topic} style={{ padding: '1rem', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', cursor: 'pointer' }}>
                                {topic}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    )
}

export default SupportPage

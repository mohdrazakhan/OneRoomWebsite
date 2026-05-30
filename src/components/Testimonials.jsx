import './Testimonials.css'

function Testimonials() {
    const testimonials = [
        {
            name: 'Anmol Singh',
            avatar: '🏎️',
            avatarColor: '#ea4335',
            rating: 5,
            date: 'January 21, 2026',
            text: 'Amazing Application, solves a very important issue for people living in Pg and hostels. Clean and fast interface, superb functionality.'
        },
        {
            name: 'Kirtiman Singh',
            avatar: '🥷',
            avatarColor: '#0f9d58',
            rating: 5,
            date: 'March 4, 2026',
            text: 'I use this app to monitor my expenses, this is an amazing app for Expense managing love it 🤩'
        },
        {
            name: 'Rohit Barnwal',
            avatar: 'R',
            avatarColor: '#ec407a',
            rating: 5,
            date: 'March 4, 2026',
            text: 'This app is really helpful specially in task remembering, amazing app but might need to improvement in auto task assigning feature when toggle off/on'
        },
        {
            name: 'Crazy Queen',
            avatar: '🏰',
            avatarColor: '#ff9800',
            rating: 1,
            date: 'January 21, 2026',
            text: 'very poor not to install this app any more iam requesting everyone not to install this app this is useless app please don\'t download it'
        },
        {
            name: 'Amit Kumar',
            avatar: 'A',
            avatarColor: '#00acc1',
            rating: 5,
            date: 'March 4, 2026',
            text: 'this is really very useful app'
        },
        {
            name: 'S.H. Solutions',
            avatar: '💼',
            avatarColor: '#795548',
            rating: 5,
            date: 'December 28, 2025',
            text: 'this application is really helpful 😄 , it help me to track room expenses with room tasks as well love it'
        },
        {
            name: 'Abhi',
            avatar: '🐱',
            avatarColor: '#7e57c2',
            rating: 5,
            date: 'January 21, 2026',
            text: 'nice working app'
        },
        {
            name: 'Gyani Bot',
            avatar: '🤖',
            avatarColor: '#4285f4',
            rating: 5,
            date: 'January 21, 2026',
            text: 'Good experience 😃'
        },
        {
            name: 'Prajwal Jha',
            avatar: '🕶️',
            avatarColor: '#607d8b',
            rating: 5,
            date: 'January 24, 2026',
            text: 'Excellent'
        }
    ]

    // Duplicate testimonials to create a seamless infinite loop
    const marqueeTestimonials = [...testimonials, ...testimonials]

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <div className="testimonials-header-flex reveal">
                    <div className="testimonials-header-text">
                        <h2 className="section-title">
                            Loved by <span style={{ color: 'var(--brand-purple)' }}>Hundreds</span>
                        </h2>
                        <p className="section-subtitle">
                            See what our users have to say about OneRoom
                        </p>
                    </div>

                    <div className="testimonials-header-stats">
                        <div className="stat-box">
                            <div className="stat-value">4.7★</div>
                            <div className="stat-label">14 reviews</div>
                        </div>
                        <div className="stat-separator"></div>
                        <div className="stat-box">
                            <div className="stat-value">100+</div>
                            <div className="stat-label">Downloads</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonials-marquee-wrapper">
                <div className="animate-marquee">
                    {marqueeTestimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card bento-shadow">
                            {/* Card Header: Avatar + User Info */}
                            <div className="testimonial-header">
                                {testimonial.avatar.length === 1 ? (
                                    <div 
                                        className="author-avatar-circle" 
                                        style={{ backgroundColor: testimonial.avatarColor }}
                                    >
                                        {testimonial.avatar}
                                    </div>
                                ) : (
                                    <div 
                                        className="author-avatar-emoji"
                                        style={{ backgroundColor: testimonial.avatarColor + '15' }}
                                    >
                                        {testimonial.avatar}
                                    </div>
                                )}
                                <div className="author-meta">
                                    <div className="author-name">{testimonial.name}</div>
                                    <div className="rating-date-row">
                                        <div className="testimonial-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <span 
                                                    key={i} 
                                                    className={`star ${i < testimonial.rating ? 'star-filled' : 'star-empty'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="testimonial-date">{testimonial.date}</span>
                                    </div>
                                </div>
                                <div className="playstore-icon" title="Verified Google Play Review">
                                    <svg viewBox="0 0 24 24" width="16" height="16">
                                        <path d="M3.25 2.5a1 1 0 0 0-.25.7v17.6a1 1 0 0 0 .25.7l9.75-9.75z" fill="#00c6ff"/>
                                        <path d="M17.06 7.64l-4.06 4.06 4.06 4.06 3.69-2.1a2 2 0 0 0 0-3.92z" fill="#ffeb3b"/>
                                        <path d="M3.25 2.5L13 12.25l4.06-4.06-13.81-7.89a1 1 0 0 0-1 0z" fill="#00e676"/>
                                        <path d="M3.25 21.5a1 1 0 0 0 1 0l13.81-7.89-4.06-4.06z" fill="#ff1744"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Card Body: Text */}
                            <div className="testimonial-body">
                                <p className="testimonial-text">"{testimonial.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials

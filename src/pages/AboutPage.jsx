import '../styles/About.css'

function AboutPage() {
    return (
        <main className="page-container">
            <div className="container">
                <div className="page-header">
                    <h1>About OneRoom</h1>
                    <p className="subtitle">Simplifying usage of shared spaces for everyone.</p>
                </div>

                <section className="page-content">
                    <div className="content-block">
                        <h2>Our Mission</h2>
                        <p>
                            Living with roommates shouldn't be a struggle. At OneRoom, we believe that shared living
                            can be a harmonious and enriching experience when the friction of daily logistics is removed.
                            Our mission is to provide the ultimate toolkit for roommates to manage their home, finances,
                            and relationships with transparency and ease.
                        </p>
                        <div className="founder-profile">
                            <img src="/assets/raza-khan.jpg" alt="Mohd Raza Khan" className="founder-image" />
                            <div className="founder-info">
                                <p className="founder-signature">
                                    — Mohd Raza Khan, Founder
                                </p>
                                <a href="https://www.linkedin.com/in/mohdrazakhan32/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                    Connect on LinkedIn ➜
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="content-block">
                        <h2>Our Story</h2>
                        <p>
                            OneRoom didn't start as a business idea; it started as a necessity during my final year of B.Tech CSE.
                            Living in a flat with my closest friends was supposed to be the highlight of college, but the reality
                            was often buried under piles of unassigned tasks and confusing expense sheets.
                        </p>
                        <p>
                            We tried managing it all manually—building complex Excel spreadsheets to track every rupee and chore. But the
                            moment someone went home for the weekend or a friend crashed with us, the entire system broke. The math
                            never seemed to add up, and "It's not my turn" became the most common phrase in the house.
                        </p>
                        <p>
                            The friction of managing a household was slowly eating away at the joy of living together. I realized that
                            student life is too dynamic for static spreadsheets. I decided to solve this myself. I poured my technical
                            skills and personal frustration into building OneRoom—a solution designed to handle the chaos so we could
                            stop arguing about the dishes and go back to being friends.
                        </p>
                    </div>

                    <div className="content-block">
                        <h2>Our Values</h2>
                        <ul className="values-list">
                            <li><strong>Transparency:</strong> Clear finances and responsibilities build trust.</li>
                            <li><strong>Simplicity:</strong> Tools should work for you, not create more work.</li>
                            <li><strong>Harmony:</strong> A well-organized home is a happy home.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default AboutPage

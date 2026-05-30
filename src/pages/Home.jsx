import Hero from '../components/Hero'
import Stats from '../components/Stats'
import NeutralThirdParty from '../components/NeutralThirdParty'
import FeaturesBento from '../components/FeaturesBento'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

function Home() {
    return (
        <main>
            <Hero />
            <Stats />
            <NeutralThirdParty />
            <FeaturesBento />
            <Testimonials />
            <Newsletter />
        </main>
    )
}

export default Home

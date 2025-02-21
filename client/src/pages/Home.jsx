import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Packages from "../components/Packages"
import PopularFeatures from "../components/PopularFeatures"
import Services from "../components/Services"
import Faq from "../utils/Faq"
import WhyUs from "../utils/WhyUs"

const Home = () => {
  return (
    <div className="h-screen w-screen bg-color-[#E73895]">

      <Navbar />
      <Header />
      <Services />
      <Packages />
      <PopularFeatures />
      <WhyUs />
      <Faq />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
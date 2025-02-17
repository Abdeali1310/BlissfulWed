import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import WeddingPackages from "../components/Packages"
import PopularFeatures from "../components/PopularFeatures"
import Services from "../components/Services"

const Home = () => {
  return (
    <div className="h-screen w-screen bg-color-[#E73895]">

      <Navbar />
      <Header />
      <Services />
      <WeddingPackages />
      <PopularFeatures />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Home
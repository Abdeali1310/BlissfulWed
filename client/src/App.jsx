import { Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import Signin from "./pages/user/Signin"
import ForgotPassword from "./utils/Forgotpassword"
import Verification from "./utils/Verification"
import Changepassword from "./utils/Changepassword"
import ResetPasswordPage from "./utils/Resetpassword"
import AdminSignup from "./pages/admin/Signup"
import AdminSignIn from "./pages/admin/Signin"
import Home from "./pages/Home"
import AboutUs from "./templates/AboutUs"
import TermsOfService from "./templates/TermsOfService"
import ContactUs from "./components/ContactUs"
import PrivacyPolicy from "./templates/PrivacyPolicy"
import Gallery from "./pages/LandingPage/Gallery.jsx"
import WeddingPackage from "./pages/WeddingPackages.jsx";
const App = () => {
  return (
    <div className="flex w-screen h-screen bg-[#f9f9f9] overflow-x-hidden">
      <Routes>
        <Route path="/gallery/album" element={<Gallery />} />
        <Route path="/packages" element={<WeddingPackage />} />
        {/* <Route path="/couple/gallery" element={<Gallery />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/forgot-password/otp-verification" element={<Verification />} />
        <Route path="/user/change-password" element={<Changepassword />} />
        <Route path="/user/reset-password" element={<ResetPasswordPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* <Route path="/gallery/album/:event" element={<EventGallery />} /> */}

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />

        <Route path="/service/:serviceType" element={<ServiceDetails />} />
        <Route path="/service/:serviceType/:serviceId" element={<IndividualService />} />
      </Routes>
    </div>
  )
}

export default App

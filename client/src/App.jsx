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
import EventGallery from "./pages/LandingPage/EventGallery.jsx"
import WeddingPackage from "./pages/WeddingPackages.jsx";
import ServiceDetails from "./pages/Services/ServiceDetails.jsx"
import IndividualService from "./pages/Services/IndividualService.jsx"
import BookingPage from "./pages/Booking.jsx"
import Packages from "./components/Packages.jsx";
import PackageDetails from "./components/PackageDetails.jsx";
import Payment from "./pages/Payment.jsx"
import PaymentStatus from "./pages/PaymentStatus.jsx"
import UserPfp from "./pages/user/UserPfp.jsx"
import UserPfpEdit from "./pages/user/UserPfpEdit.jsx"
const App = () => {
  return (
    <div className="flex w-screen h-screen bg-[#f9f9f9] overflow-x-hidden">
      <Routes>
        <Route path="/gallery/album" element={<Gallery />} />
        <Route path="/packages" element={<WeddingPackage />} />
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Package Routes */}
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:packageName" element={<PackageDetails />} />

        {/* User Authentication */}
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/forgot-password/otp-verification" element={<Verification />} />
        <Route path="/user/change-password" element={<Changepassword />} />
        <Route path="/user/reset-password" element={<ResetPasswordPage />} />

        {/* Admin Authentication */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />

        {/* Other Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/gallery/album/:category" element={<EventGallery />} />

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />

        <Route path="/service/:serviceType" element={<ServiceDetails />} />
        <Route path="/service/:serviceType/:serviceId" element={<IndividualService />} />

        <Route path="/user/profile" element={<UserPfp />} />
        <Route path="profile/edit" element={<UserPfpEdit />} />

        <Route path="/booking" element={<BookingPage />} />

        {/* payment */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
      </Routes>
    </div>
  );
};

export default App;
import { Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import Signin from "./pages/user/Signin"
// import Home from "./pages/Home"
import ForgotPassword from "./utils/Forgotpassword"
import Verification from "./utils/Verification"
import Changepassword from "./utils/Changepassword"
import ResetPasswordPage from "./utils/Resetpassword"
import AdminSignup from "./pages/admin/Signup"
import AdminSignIn from "./pages/admin/Signin"
import Home from "./pages/Home"
import WeddingPlanner from "./pages/LandingPage/WeddingPlanner"

const App = () => {
  return (
    <div className="flex w-screen h-screen bg-[#f9f9f9] overflow-x-hidden">
      <Routes>
        <Route path="/test" element={<WeddingPlanner />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/forgot-password/otp-verification" element={<Verification />} />
        <Route path="/user/change-password" element={<Changepassword />} />
        <Route path="/user/reset-password" element={<ResetPasswordPage />} />

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
      </Routes>
    </div>
  )
}

export default App

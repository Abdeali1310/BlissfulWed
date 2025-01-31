import { Route, Routes } from "react-router-dom"
import Signup from "./pages/user/Signup"
import Signin from "./pages/user/Signin"

const App = () => {
  return (
    <div className="bg-[] flex w-screen h-screen">
      <Routes>
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
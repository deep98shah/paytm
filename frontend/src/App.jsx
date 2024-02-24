import { Suspense } from "react"
import Dashboard from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Suspense fallback="loading"><SignUp></SignUp></Suspense>}></Route>
            <Route path="/signin" element={<Suspense fallback="loading"><SignIn></SignIn></Suspense>}></Route>
            <Route path="/dashboard" element={<Suspense fallback="loading"><Dashboard></Dashboard></Suspense>}></Route>
            <Route path="/send" element={<Suspense fallback="loading"><SendMoney></SendMoney></Suspense>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

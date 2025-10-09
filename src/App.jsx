import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import QuestionAndAnswer from "./Pages/QuestionAndAnswer"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ShowAnswer from "./Pages/ShowAnswer"
import NotFound from "./Pages/NotFound"
import Layout from "./Components/Layout"

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser()

  // รอจนกว่าสถานะผู้ใช้จะ load เสร็จ
  if (!isLoaded) return null

  if (!isSignedIn) return <Navigate to="/login" replace />

  return <Outlet /> // render child routes
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<QuestionAndAnswer />} />
            <Route path="/show" element={<ShowAnswer />} />
          </Route>
        </Route>

        {/* ถ้า path ไม่ match ให้ไปหน้า login */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

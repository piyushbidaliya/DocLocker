import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Login, Register, Home } from "./pages"
export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}
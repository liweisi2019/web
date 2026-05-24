import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Journal from "./pages/Journal"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
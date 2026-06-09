import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recommend from "./pages/recommend";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

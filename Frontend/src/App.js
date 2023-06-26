import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/change-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

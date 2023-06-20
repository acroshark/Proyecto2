import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EnlacePage } from "./pages/EnlacePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UserPage } from "./pages/UserPage";
import EditProfile from "./EditProfile";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Enlace/:id" element={<EnlacePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import ContactsPage from "../pages/Contacts";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
};
export default Router;

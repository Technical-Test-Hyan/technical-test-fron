import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
export default Router;

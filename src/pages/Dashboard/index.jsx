import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../../components/Header";
import MainDashboard from "../../components/MainDashboard";

import { useUser } from "../../providers/users";
const Dashboard = () => {
  const { userInfo, verifyUserAuthenticated, isLoggedIn } = useUser();
  useEffect(() => {
    verifyUserAuthenticated();
    userInfo(localStorage.getItem("@token"));
  }, []);
  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Nav />
      <MainDashboard />
    </>
  );
};
export default Dashboard;

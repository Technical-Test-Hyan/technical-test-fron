import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import FormProfile from "../../components/FormProfile";
import SidebarWithHeader from "../../components/HeaderProfile";
import { useUser } from "../../providers/users";

const ProfilePage = () => {
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
      <SidebarWithHeader>
        <FormProfile />
      </SidebarWithHeader>
    </>
  );
};
export default ProfilePage;

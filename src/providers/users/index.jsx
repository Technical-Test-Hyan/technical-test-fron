import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfoState, setUserInfoState] = useState();
  const navigate = useNavigate();
  const verifyUserAuthenticated = () => {
    if (!localStorage.getItem("@token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const userInfo = (user_token) => {
    api
      .get("users/", {
        headers: { Authorization: `Bearer ${user_token}` },
      })
      .then((res) => setUserInfoState(res.data));
  };

  const userLogin = (data) => {
    api
      .post(`users/login`, data)
      .then((res) => {
        toast.success("Login realizado com sucesso");
        localStorage.setItem("@token", res.data.token);
        localStorage.setItem("@user_id", res.data.user_id);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const userRegister = (data) => {
    api
      .post(`users/`, data)
      .then((res) => {
        navigate("/");
        toast.success("Registro realizado com sucesso");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const userUpdate = (data, user_token) => {
    api
      .patch(`users/`, data, {
        headers: { Authorization: `Bearer ${user_token}` },
      })
      .then((res) => {
        toast.success("Updated success");
        userInfo(user_token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <UserContext.Provider
      value={{
        userInfo,
        userLogin,
        userRegister,
        userUpdate,
        isLoggedIn,
        setIsLoggedIn,
        verifyUserAuthenticated,
        userInfoState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

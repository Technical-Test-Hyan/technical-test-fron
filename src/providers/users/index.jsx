import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const verifyUserAuthenticated = () => {
    if (!localStorage.getItem("@token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
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
        navigate("/login");
        toast.success("Registro realizado com sucesso");
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };
  return (
    <UserContext.Provider
      value={{
        userLogin,
        userRegister,
        isLoggedIn,
        setIsLoggedIn,
        verifyUserAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

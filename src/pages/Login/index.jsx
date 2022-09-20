import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import { useUser } from "../../providers/users";

const LoginPage = () => {
  const { verifyUserAuthenticated, isLoggedIn } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    verifyUserAuthenticated();
  }, []);

  if (isLoggedIn) {
    navigate("/dashboard");
  }
  return (
    <Flex
      bgColor="#F2F2F2"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <FormLogin />
    </Flex>
  );
};
export default LoginPage;

import { Box, Flex } from "@chakra-ui/react";
import FormLogin from "../../components/FormLogin";

const LoginPage = () => {
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

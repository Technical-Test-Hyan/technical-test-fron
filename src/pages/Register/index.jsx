import { Flex } from "@chakra-ui/react";
import FormRegister from "../../components/FormRegister";

const RegisterPage = () => {
  return (
    <Flex
      bgColor="#F2F2F2"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <FormRegister />
    </Flex>
  );
};
export default RegisterPage;

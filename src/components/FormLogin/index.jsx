import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../../providers/users";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const { userLogin } = useUser();

  const navigate = useNavigate();

  const FormSchema = yup.object().shape({
    email: yup.string().email("Invalid format").required("Required field"),
    password: yup.string().required("Required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormSchema) });
  const OnSubmitForm = (data) => {
    userLogin(data);
  };

  return (
    <Flex
      w="100%"
      maxW={350}
      boxShadow="dark-lg"
      justifyContent="space-evenly"
      alignItems="center"
      m="0 auto"
      h="500px"
      borderRadius="10px"
      flexDirection="column"
    >
      <Text fontSize="30px" lineHeight="1.2" fontWeight="bold">
        Login
      </Text>
      <form onSubmit={handleSubmit(OnSubmitForm)}>
        <Flex flexDirection="column" alignItems="center">
          <FormControl isRequired isInvalid={errors.email}>
            <Input type="email" {...register("email")} placeholder="Email" />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.password}>
            <Input
              type="password"
              {...register("password")}
              placeholder="Password"
              m="30px auto"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            type="submit"
            width="100%"
            borderRadius="50px"
            bgGradient="linear(to-r, #21d4fd, #b721ff)"
            transition="all 0.3s"
            color="white"
            fontWeight="bold"
            _hover={{
              w: "90%",
            }}
          >
            Enter
          </Button>
        </Flex>
      </form>
      <Text>
        Don't have an account?{" "}
        <Text
          as="span"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/register")}
        >
          Sing-up
        </Text>
      </Text>
    </Flex>
  );
};
export default FormLogin;

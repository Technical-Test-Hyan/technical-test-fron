import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../../providers/users";
import { useNavigate } from "react-router-dom";
const FormRegister = () => {
  const { userRegister } = useUser();

  const navigate = useNavigate();

  const FormSchema = yup.object().shape({
    full_name: yup.string().required("Required field"),
    email: yup.string().email("Invalid format").required("Required field"),
    password: yup
      .string()
      .required("Required field")
      .matches(/(?=.*[a-z])/, "Must have one lower case")
      .matches(/(?=.*[A-Z])/, "Must have one upper case")
      .matches(/(?=.*[0-9])/, "Must have one number")
      .matches(/(?=.*[!$*&@#])/, "Must have one special character")
      .min(8, "Must contain at least 8 letters"),
    phone: yup
      .string()
      .required("Required field")
      .matches(
        /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
        "Invalid format, must be like : 00 12345 6789"
      ),
    passwordConfirmation: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("password"), null], "Password does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormSchema) });
  const OnSubmitForm = (data) => {
    userRegister(data);
  };

  return (
    <Flex
      w="100%"
      maxW={350}
      boxShadow="dark-lg"
      justifyContent="space-evenly"
      alignItems="center"
      m="0 auto"
      h="700px"
      borderRadius="10px"
      flexDirection="column"
    >
      <Text fontSize="30px" lineHeight="1.2" fontWeight="bold">
        Register
      </Text>
      <form onSubmit={handleSubmit(OnSubmitForm)}>
        <Flex flexDirection="column" alignItems="center">
          <FormControl isRequired isInvalid={errors.full_name}>
            <Input
              type="text"
              {...register("full_name")}
              placeholder="Full Name"
            />
            {errors.full_name && (
              <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.email}>
            <Input
              type="email"
              {...register("email")}
              placeholder="Email"
              m="30px auto"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.password}>
            <Input
              type="password"
              {...register("password")}
              placeholder="password"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.passwordConfirmation}>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...register("passwordConfirmation")}
              mt="30px"
            />
            {errors.passwordConfirmation && (
              <FormErrorMessage>
                {errors.passwordConfirmation.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.phone}>
            <Input
              type="text"
              {...register("phone")}
              placeholder="Phone"
              m="30px auto"
            />
            {errors.phone && (
              <FormErrorMessage mb="20px">
                {errors.phone.message}
              </FormErrorMessage>
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
        Already have an account?{" "}
        <Text
          as="span"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          Sing-in
        </Text>
      </Text>
    </Flex>
  );
};
export default FormRegister;

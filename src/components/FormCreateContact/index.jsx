import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContacts } from "../../providers/contacts";

const FormCreateContact = () => {
  const { create_contact } = useContacts();

  const FormSchema = yup.object().shape({
    description: yup.string(),
    full_name: yup.string().required("Required Field"),
    email: yup.string().email("Invalid format").required("Required Field"),
    phone: yup
      .string()
      .required("Required field")
      .matches(
        /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
        "Invalid format, must be like : 00 12345 6789"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormSchema) });

  const OnSubmitForm = (data) => {
    console.log(data);
    create_contact(localStorage.getItem("@token"), data);
  };
  return (
    <Stack
      as={"form"}
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      p={6}
      my={12}
      onSubmit={handleSubmit(OnSubmitForm)}
    >
      <FormControl id="full_name" isRequired isInvalid={errors.full_name}>
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder={"Full name"}
          _placeholder={{ color: "gray.500" }}
          type="full_name"
          {...register("full_name")}
        />
        {errors.full_name && (
          <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="email" isRequired isInvalid={errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder={"Email"}
          _placeholder={{ color: "gray.500" }}
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="phone" isRequired isInvalid={errors.phone}>
        <FormLabel>Phone</FormLabel>
        <Input
          type="text"
          placeholder={"Phone"}
          _placeholder={{ color: "gray.500" }}
          {...register("phone")}
        />
        {errors.phone && (
          <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="description" isInvalid={errors.description}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="A description for your contact"
          {...register("description")}
        />
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      <Stack spacing={6}>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};
export default FormCreateContact;

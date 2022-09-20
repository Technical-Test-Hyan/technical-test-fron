import {
  Button,
  FormControl,
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
const FormEditContact = ({ contact }) => {
  const { edit_contact } = useContacts();

  const FormSchema = yup.object().shape({
    description: yup.string(),
    full_name: yup.string(),
    email: yup.string().email("Invalid format"),
    phone: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormSchema) });

  const OnSubmitForm = (data) => {
    let new_data = {};
    if (data.description.trim() !== "") {
      new_data["description"] = data.description;
    }
    if (data.full_name.trim() !== "") {
      new_data["full_name"] = data.full_name;
    }
    if (data.email.trim() !== "") {
      new_data["email"] = data.email;
    }
    if (data.phone.trim() !== "") {
      new_data["phone"] = data.phone;
    }
    edit_contact(contact.id, localStorage.getItem("@token"), new_data);
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
      <FormControl id="full_name">
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder={contact.full_name}
          _placeholder={{ color: "gray.500" }}
          type="full_name"
          {...register("full_name")}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder={contact.email}
          _placeholder={{ color: "gray.500" }}
          type="email"
          {...register("email")}
        />
      </FormControl>
      <FormControl id="phone">
        <FormLabel>Phone</FormLabel>
        <Input
          type="text"
          placeholder={contact.phone}
          _placeholder={{ color: "gray.500" }}
          {...register("phone")}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="A description for your contact"
          {...register("description")}
        />
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
export default FormEditContact;

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../../providers/users";
import { useEffect, useState } from "react";
const FormProfile = () => {
  const navigate = useNavigate();

  const { userUpdate, userInfoState } = useUser();

  const [userToken, setUserToken] = useState();

  useEffect(() => {
    setUserToken(localStorage.getItem("@token"));
  }, []);

  const FormSchema = yup.object().shape({
    avatar_url: yup.string().url("Invalid URL"),
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
    if (data.avatar_url.trim() !== "") {
      new_data["avatar_url"] = data.avatar_url;
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

    userUpdate(new_data, userToken);
  };

  return (
    <Flex
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        as={"form"}
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        onSubmit={handleSubmit(OnSubmitForm)}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>

        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size={"xl"}
                src={
                  userInfoState
                    ? userInfoState.avatar_url
                    : "https://avatars.dicebear.com/api/male/username.svg"
                }
              />
              <FormControl id="avatar_url" ml={20}>
                <FormLabel>Avatar url</FormLabel>
                <Input
                  placeholder="https://someurl.com"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  {...register("avatar_url")}
                />
              </FormControl>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <FormLabel>User full name</FormLabel>
          <Input
            placeholder="Full name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            {...register("full_name")}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            {...register("email")}
          />
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Phone</FormLabel>
          <Input
            placeholder="Phone"
            _placeholder={{ color: "gray.500" }}
            type="text"
            {...register("phone")}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
export default FormProfile;

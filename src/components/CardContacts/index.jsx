import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Popover,
} from "@chakra-ui/react";
import React from "react";
import { useContacts } from "../../providers/contacts";
import FormEditContact from "../FormEditContact";

const CardContacts = ({ contact }) => {
  console.log(contact);
  const { delete_contact } = useContacts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {contact.full_name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {contact.phone}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {contact.description
            ? contact.description
            : "No description available"}
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            onClick={onOpen}
          >
            Edit
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit this contact</ModalHeader>
              <ModalCloseButton />
              <FormEditContact contact={contact} />
            </ModalContent>
          </Modal>

          <Popover>
            <PopoverTrigger>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"red.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Delete
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Are you sure?</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={"red.400"}
                    color={"white"}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                      bg: "blue.500",
                    }}
                    _focus={{
                      bg: "blue.500",
                    }}
                    onClick={() =>
                      delete_contact(contact.id, localStorage.getItem("@token"))
                    }
                  >
                    Delete
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Stack>
      </Box>
    </Center>
  );
};
export default CardContacts;

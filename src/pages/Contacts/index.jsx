import { useEffect } from "react";
import SidebarWithHeader from "../../components/HeaderProfile";
import ListContacts from "../../components/ListContacts";
import { useContacts } from "../../providers/contacts";
import { useUser } from "../../providers/users";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import FormCreateContact from "../../components/FormCreateContact";
const ContactsPage = () => {
  const { get_all_contacts, contacts } = useContacts();
  const { userInfo } = useUser();
  useEffect(() => {
    get_all_contacts(localStorage.getItem("@token"));
    userInfo(localStorage.getItem("@token"));
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarWithHeader>
        <Button onClick={onOpen} m="30px auto" bgColor="#0BC5EA" color="white">
          Create Contact
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormCreateContact />
            </ModalBody>
          </ModalContent>
        </Modal>
        <ListContacts contacts={contacts} />
      </SidebarWithHeader>
    </>
  );
};
export default ContactsPage;

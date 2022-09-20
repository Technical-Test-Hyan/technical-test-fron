import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import api from "../../services";

export const ContactsContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState();
  const get_all_contacts = (token_user) => {
    api
      .get("contacts/", {
        headers: { Authorization: `Bearer ${token_user}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.log(err));
  };
  const create_contact = (token_user, data) => {
    api
      .post(`contacts/`, data, {
        headers: { Authorization: `Bearer ${token_user}` },
      })
      .then((res) => {
        toast.success("Contact created with success");
        get_all_contacts(token_user);
      });
  };
  const edit_contact = (id, token_user, data) => {
    api
      .patch(`contacts/${id}/`, data, {
        headers: { Authorization: `Bearer ${token_user}` },
      })
      .then((res) => {
        toast.success("Contact updated with success");
        get_all_contacts(token_user);
      })
      .catch((err) => console.log(err));
  };
  const delete_contact = (id, token_user) => {
    api
      .delete(`contacts/${id}/`, {
        headers: { Authorization: `Bearer ${token_user}` },
      })
      .then((res) => {
        toast.success("Contact deleted with success");
        get_all_contacts(token_user);
      });
  };
  return (
    <ContactsContext.Provider
      value={{
        get_all_contacts,
        contacts,
        edit_contact,
        delete_contact,
        create_contact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => useContext(ContactsContext);

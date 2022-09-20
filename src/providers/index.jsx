import { ContactProvider } from "./contacts";
import { UserProvider } from "./users";
const Providers = ({ children }) => {
  return (
    <UserProvider>
      <ContactProvider>{children}</ContactProvider>
    </UserProvider>
  );
};

export default Providers;

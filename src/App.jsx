import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Router from "./routes";
function App() {
  return (
    <ChakraProvider>
      <Router />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;

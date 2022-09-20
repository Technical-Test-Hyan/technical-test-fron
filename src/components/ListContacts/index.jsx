import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import CardContacts from "../CardContacts";

const ListContacts = ({ contacts }) => {
  return (
    <>
      {contacts && contacts.length == 0 ? (
        <>
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Text textAlign="center" mt="20px" fontWeight="bold">
            You don't have any contact
          </Text>
        </>
      ) : (
        <Flex flexWrap={"wrap"} justifyContent="space-around">
          {contacts &&
            contacts.map((e) => <CardContacts contact={e} key={e.id} />)}
        </Flex>
      )}
    </>
  );
};
export default ListContacts;

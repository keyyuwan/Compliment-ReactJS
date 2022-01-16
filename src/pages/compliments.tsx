import Router from "next/router";
import Link from "next/link";
import {
  Flex,
  Avatar,
  Heading,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Compliments() {
  const { signOut, isAuthenticated, user } = useAuth();

  function logOut() {
    signOut();

    Router.push("/");
  }

  return isAuthenticated ? (
    <Box maxW="1120px" mx="auto" mt="16">
      <Flex align="center" justify="center" gap="6">
        <Avatar bg="purple.400" size="lg" name={user?.name} />
        <Heading>{user?.name}</Heading>
        <IconButton
          colorScheme="red"
          aria-label="Sign out"
          icon={<FaSignOutAlt />}
          onClick={logOut}
        />
      </Flex>

      <Flex align="center" justify="center" gap="4" mt="8">
        <Button colorScheme="purple">Compliments received</Button>
        <Button colorScheme="purple" variant="outline">
          Compliments sent
        </Button>
        <Button colorScheme="purple" variant="outline">
          Tags
        </Button>
        <Button colorScheme="purple" variant="outline">
          Users
        </Button>
      </Flex>
    </Box>
  ) : (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Heading textDecoration="underline">
        Please, <Link href="/">authenticate</Link>
      </Heading>
    </Flex>
  );
}

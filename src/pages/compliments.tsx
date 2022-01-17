import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { Flex, Avatar, Heading, Box, IconButton } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { NavButton } from "../components/NavButton";
import { Users } from "../components/Users";
import { Tags } from "../components/Tags";

export default function Compliments() {
  const { signOut, isAuthenticated, user } = useAuth();

  function logOut() {
    signOut();

    Router.push("/");
  }

  const [buttonActive, setButtonActive] = useState("compliments-received");

  return isAuthenticated ? (
    <Box maxW="600px" mx="auto" mt="16">
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
        <NavButton
          title="Compliments received"
          active={buttonActive === "compliments-received"}
          onClick={() => setButtonActive("compliments-received")}
        />
        <NavButton
          title="Compliments sent"
          active={buttonActive === "compliments-sent"}
          onClick={() => setButtonActive("compliments-sent")}
        />
        <NavButton
          title="Tags"
          active={buttonActive === "tags"}
          onClick={() => setButtonActive("tags")}
        />
        <NavButton
          title="Users"
          active={buttonActive === "users"}
          onClick={() => setButtonActive("users")}
        />
      </Flex>

      {buttonActive === "users" && (
        <Box mt="8">
          <Users />
        </Box>
      )}

      {buttonActive === "tags" && (
        <Box mt="8">
          <Tags />
        </Box>
      )}
    </Box>
  ) : (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Heading textDecoration="underline">
        Please, <Link href="/">authenticate</Link>
      </Heading>
    </Flex>
  );
}

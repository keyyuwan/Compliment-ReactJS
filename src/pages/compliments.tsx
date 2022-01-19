import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Flex,
  Avatar,
  Heading,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { NavButton } from "../components/NavButton";
import { Users } from "../components/Users";
import { Tags } from "../components/Tags";
import { ComplimentsList } from "../components/ComplimentsList";
import { CreateCompliment } from "../components/CreateCompliment";

export default function Compliments() {
  const { signOut, isAuthenticated, user } = useAuth();

  const router = useRouter();

  function logOut() {
    signOut();

    router.push("/");
  }

  const [buttonActive, setButtonActive] = useState("compliments-received");

  const [isComplimentModalOpen, setIsComplimentModalOpen] = useState(false);

  function handleCloseComplimentModal() {
    setIsComplimentModalOpen(false);
  }

  return isAuthenticated ? (
    <Box maxW="600px" mx="auto" mt="16">
      <Flex align="center" justify="center" gap="6">
        <Avatar bg="purple.400" size="lg" name={user?.name} />
        <Heading>{user?.name}</Heading>
        <Tooltip hasArrow label="Send compliment">
          <IconButton
            colorScheme="purple"
            aria-label="Send compliment"
            onClick={() => setIsComplimentModalOpen(true)}
            icon={<FaPlus />}
          />
        </Tooltip>
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
        <CreateCompliment
          isComplimentModalOpen={isComplimentModalOpen}
          handleClose={handleCloseComplimentModal}
        />
      </Flex>

      {buttonActive === "users" && (
        <Box my="8">
          <Users />
        </Box>
      )}

      {buttonActive === "tags" && (
        <Box my="8">
          <Tags />
        </Box>
      )}

      {buttonActive === "compliments-received" && (
        <Box my="8">
          <ComplimentsList complimentType="received" />
        </Box>
      )}

      {buttonActive === "compliments-sent" && (
        <Box my="8">
          <ComplimentsList complimentType="sent" />
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

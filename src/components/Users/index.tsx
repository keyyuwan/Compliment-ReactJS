import { useState } from "react";
import {
  VStack,
  Avatar,
  Text,
  Flex,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../contexts/AuthContext";
import { CreateCompliment } from "../CreateCompliment";

export function Users() {
  const users = useUsers();

  const { user: userAuth } = useAuth();

  const [isComplimentModalOpen, setIsComplimentModalOpen] = useState(false);

  function handleCloseComplimentModal() {
    setIsComplimentModalOpen(false);
  }

  const [userSelected, setUserSelected] = useState({
    id: "",
    name: "",
  });

  return (
    <>
      <VStack spacing="6">
        {users.map((user) => (
          <Flex key={user.id} align="center" gap="4">
            <Avatar bg="purple.400" size="md" name={user.name} />
            <Text fontWeight="bold" fontSize="xl">
              {user.name}
            </Text>
            {userAuth.email !== user.email && (
              <Tooltip label={`Compliment ${user.name}`} hasArrow>
                <IconButton
                  size="sm"
                  bg="purple.300"
                  _hover={{ bg: "purple.300" }}
                  aria-label="Compliment user"
                  icon={<FaPen />}
                  onClick={() => {
                    setIsComplimentModalOpen(true);
                    setUserSelected(user);
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        ))}
      </VStack>

      <CreateCompliment
        isComplimentModalOpen={isComplimentModalOpen}
        handleClose={handleCloseComplimentModal}
        userSelected={userSelected}
      />
    </>
  );
}

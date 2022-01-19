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

export function Users() {
  const users = useUsers();

  const { user: userAuth } = useAuth();

  return (
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
              />
            </Tooltip>
          )}
        </Flex>
      ))}
    </VStack>
  );
}

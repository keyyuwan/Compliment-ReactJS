import { useState } from "react";
import {
  VStack,
  Text,
  Button,
  Flex,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTags } from "../../hooks/useTags";
import { CreateCompliment } from "../CreateCompliment";

export function Tags() {
  const tags = useTags();

  const { user } = useAuth();

  const [isComplimentModalOpen, setIsComplimentModalOpen] = useState(false);

  function handleCloseComplimentModal() {
    setIsComplimentModalOpen(false);
  }

  const [tagSelected, setTagSelected] = useState({
    id: "",
    name: "",
    customName: "",
  });

  return (
    <>
      <VStack spacing="6">
        {tags.map((tag) => (
          <Flex key={tag.id} align="center" gap="4">
            <Text fontWeight="bold" fontSize="2xl">
              {tag.customName}
            </Text>
            <Tooltip label={`Create compliment with tag ${tag.name}`} hasArrow>
              <IconButton
                size="sm"
                bg="purple.300"
                _hover={{ bg: "purple.300" }}
                aria-label="Create compliment with this tag"
                icon={<FaPlus />}
                onClick={() => {
                  setIsComplimentModalOpen(true);
                  setTagSelected(tag);
                }}
              />
            </Tooltip>
          </Flex>
        ))}
        {user.admin && (
          <Button colorScheme="purple" leftIcon={<FaPlus />}>
            Create Tag
          </Button>
        )}
      </VStack>

      <CreateCompliment
        isComplimentModalOpen={isComplimentModalOpen}
        handleClose={handleCloseComplimentModal}
        tagSelected={tagSelected}
      />
    </>
  );
}

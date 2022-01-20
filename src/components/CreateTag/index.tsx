import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Flex,
  Input,
} from "@chakra-ui/react";
import { api } from "../../services/api";

interface CreateTagProps {
  isCreateTagModalOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function CreateTag({
  isCreateTagModalOpen,
  handleClose,
  isLoading,
  setIsLoading,
}: CreateTagProps) {
  const [tagName, setTagName] = useState("");

  const toast = useToast();

  async function handleCreateTag() {
    setIsLoading(true);
    try {
      await api.post("/tags", {
        name: tagName,
      });

      toast({
        title: "Tag created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleClose();
    } catch (err) {
      toast({
        title: "Error to create tag.",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isCreateTagModalOpen} onClose={handleClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Create Tag</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Input
            placeholder="Tag name"
            borderColor="purple.400"
            focusBorderColor="purple.400"
            value={tagName}
            onChange={(event) => setTagName(event.target.value)}
            isRequired
          />
        </ModalBody>

        <ModalFooter>
          <Flex align="center" gap="4">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              colorScheme="purple"
              onClick={handleCreateTag}
              isLoading={isLoading}
            >
              Create
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

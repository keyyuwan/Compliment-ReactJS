import { FormEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  VStack,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../contexts/AuthContext";
import { useTags, Tag } from "../../hooks/useTags";
import { api } from "../../services/api";

interface User {
  id: string;
  name: string;
}

interface CreateComplimentProps {
  isComplimentModalOpen: boolean;
  handleClose: () => void;
  userSelected?: User;
  tagSelected?: Tag;
}

export function CreateCompliment({
  isComplimentModalOpen,
  handleClose,
  userSelected,
  tagSelected,
}: CreateComplimentProps) {
  const users = useUsers();
  const tags = useTags();

  const toast = useToast();

  const { user: userAuth } = useAuth();

  const [sendComplimentInfo, setSendComplimentInfo] = useState({
    userId: userSelected !== undefined ? userSelected.id : "",
    tagId: tagSelected !== undefined ? tagSelected.id : "",
    message: "",
  });

  useEffect(() => {
    if (userSelected) {
      setSendComplimentInfo({
        ...sendComplimentInfo,
        userId: userSelected.id,
      });
    }
  }, [userSelected]);

  useEffect(() => {
    if (tagSelected) {
      setSendComplimentInfo({
        ...sendComplimentInfo,
        tagId: tagSelected.id,
      });
    }
  }, [tagSelected]);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSendCompliment(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await api.post("/compliments", {
        tag_id: sendComplimentInfo.tagId,
        user_receiver: sendComplimentInfo.userId,
        message: sendComplimentInfo.message,
      });

      toast({
        title: "Compliment sent!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleClose();
    } catch (err) {
      toast({
        title: "Error to send compliment.",
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
    <Modal isOpen={isComplimentModalOpen} onClose={handleClose} isCentered>
      <ModalOverlay />

      <ModalContent as="form" onSubmit={handleSendCompliment}>
        <ModalHeader>Create Compliment</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing="6">
            {userSelected ? (
              <Select
                variant="filled"
                size="lg"
                focusBorderColor="purple.400"
                placeholder={userSelected.name}
              />
            ) : (
              <Select
                variant="filled"
                size="lg"
                focusBorderColor="purple.400"
                placeholder="Person"
                isRequired
                onChange={(event) =>
                  setSendComplimentInfo({
                    ...sendComplimentInfo,
                    userId: event.target.value,
                  })
                }
              >
                {users.map((user) => {
                  if (userAuth.email !== user.email) {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </Select>
            )}

            {tagSelected ? (
              <Select
                variant="filled"
                size="lg"
                focusBorderColor="purple.400"
                placeholder={tagSelected.customName}
              />
            ) : (
              <Select
                variant="filled"
                size="lg"
                focusBorderColor="purple.400"
                placeholder="Tag"
                onChange={(event) =>
                  setSendComplimentInfo({
                    ...sendComplimentInfo,
                    tagId: event.target.value,
                  })
                }
                isRequired
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.customName}
                  </option>
                ))}
              </Select>
            )}

            <Textarea
              isRequired
              size="lg"
              focusBorderColor="purple.400"
              borderColor="purple.400"
              placeholder="Message"
              value={sendComplimentInfo.message}
              onChange={(event) =>
                setSendComplimentInfo({
                  ...sendComplimentInfo,
                  message: event.target.value,
                })
              }
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Flex align="center" gap="4">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" colorScheme="purple" isLoading={isLoading}>
              Send
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

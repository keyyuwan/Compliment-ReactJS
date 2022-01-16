import { useState, FormEvent } from "react";
import Router from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Input } from "../Form/Input";
import { api } from "../../services/api";

type SignInProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SignIn({ isOpen, onClose }: SignInProps) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    if (!!userInfo.email && !!userInfo.password) {
      setIsLoading(true);
      try {
        const { data: token } = await api.post("/auth", userInfo);

        localStorage.setItem("@comp:token", token);

        toast({
          title: "Welcome!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        Router.push("/compliments");
      } catch (err) {
        toast({
          title: "Error signin in",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error signin in",
        description: "Fill in email and password to continue.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" bg="gray.600" onSubmit={handleSignIn}>
        <ModalHeader color="purple.50">Sign In</ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody>
          <VStack mt="4" spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              value={userInfo.email}
              onChange={(event) =>
                setUserInfo({ ...userInfo, email: event.target.value })
              }
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={userInfo.password}
              onChange={(event) =>
                setUserInfo({ ...userInfo, password: event.target.value })
              }
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" isLoading={isLoading}>
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

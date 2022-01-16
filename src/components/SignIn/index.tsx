import { useState, FormEvent } from "react";
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
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../Form/Input";

type SignInProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SignIn({ isOpen, onClose }: SignInProps) {
  const { isLoading, signIn } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    signIn(userInfo);
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

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
import { Input } from "../Form/Input";

type SignInProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SignIn({ isOpen, onClose }: SignInProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" bg="gray.600">
        <ModalHeader color="purple.50">Sign In</ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody>
          <VStack mt="4" spacing="4">
            <Input name="email" label="E-mail" type="email" />
            <Input name="password" label="Password" type="password" />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button>Sign In</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

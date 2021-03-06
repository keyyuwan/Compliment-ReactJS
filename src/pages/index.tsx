import Link from "next/link";
import {
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEllo } from "react-icons/fa";
import { SignIn } from "../components/SignIn";

export default function Home() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <VStack w="100vw" h="100vh" justify="center" spacing="6">
      <FaEllo size={60} />
      <Heading fontSize={["4xl", "6xl"]}>Compliment.</Heading>

      <Text fontSize={["xl", "2xl"]}>Have you praised someone today?</Text>

      <HStack spacing="4">
        <Link href="/signup">
          <Button colorScheme="purple" size="lg">
            Sign Up
          </Button>
        </Link>
        <Button
          colorScheme="purple"
          size="lg"
          variant="outline"
          onClick={onOpen}
        >
          Sign In
        </Button>

        <SignIn isOpen={isOpen} onClose={onClose} />
      </HStack>
    </VStack>
  );
}

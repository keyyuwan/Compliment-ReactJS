import Link from "next/link";
import { VStack, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { FaEllo } from "react-icons/fa";

export default function Home() {
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
        <Button colorScheme="purple" size="lg" variant="outline">
          Sign In
        </Button>
      </HStack>
    </VStack>
  );
}

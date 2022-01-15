import Link from "next/link";
import { Flex, VStack, Heading, Button } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Input } from "../components/Form/Input";

export default function SignUp() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        direction="column"
        w={["300px", "400px"]}
        bg="gray.600"
        borderRadius="8px"
        p={["4", "6"]}
      >
        <Flex align="center" gap="4">
          <Link href="/">
            <Button bg="none" _hover={{ bg: "none" }}>
              <FaArrowLeft style={{ color: "white" }} />
            </Button>
          </Link>
          <Heading fontSize="xl" color="purple.50">
            Sign Up
          </Heading>
        </Flex>

        <VStack mt="4" spacing="4">
          <Input name="name" label="Name" />
          <Input name="email" label="E-mail" />
          <Input name="password" label="Password" />
        </VStack>

        <Button mt="6">Sign Up</Button>
      </Flex>
    </Flex>
  );
}

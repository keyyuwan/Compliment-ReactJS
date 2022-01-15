import {
  Flex,
  VStack,
  Heading,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignUp() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        direction="column"
        w="360px"
        bg="gray.600"
        borderRadius="8px"
        p="6"
      >
        <Heading fontSize="xl" color="purple.50">
          Sign Up
        </Heading>

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

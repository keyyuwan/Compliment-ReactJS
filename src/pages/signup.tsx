import { FormEvent, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import {
  Flex,
  VStack,
  Heading,
  Button,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Input } from "../components/Form/Input";
import { api } from "../services/api";

export default function SignUp() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await api.post("/users", userInfo);

      toast({
        title: "Account created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      Router.push("/");
    } catch (err) {
      toast({
        title: "Error creating account.",
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
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        direction="column"
        w={["300px", "400px"]}
        bg="gray.600"
        borderRadius="8px"
        p={["4", "6"]}
        onSubmit={handleSignUp}
      >
        <Flex align="center" gap="4">
          <Link href="/">
            <IconButton
              bg="none"
              _hover={{ bg: "none" }}
              aria-label="Go back"
              icon={<FaArrowLeft style={{ color: "white" }} />}
            />
          </Link>
          <Heading fontSize="xl" color="purple.50">
            Sign Up
          </Heading>
        </Flex>

        <VStack mt="4" spacing="4">
          <Input
            name="name"
            label="Name"
            value={userInfo.name}
            onChange={(event) =>
              setUserInfo({ ...userInfo, name: event.target.value })
            }
            isRequired
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            value={userInfo.email}
            onChange={(event) =>
              setUserInfo({ ...userInfo, email: event.target.value })
            }
            isRequired
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={userInfo.password}
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            isRequired
          />
        </VStack>

        <Button mt="6" type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
}

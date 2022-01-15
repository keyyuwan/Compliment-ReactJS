import { Flex, Avatar, Heading, Box, Button } from "@chakra-ui/react";

export default function Compliments() {
  return (
    <Box maxW="1120px" mx="auto" mt="16">
      <Flex align="center" justify="center" gap="6">
        <Avatar size="lg" name="Key Yu Wan" />
        <Heading>Key Yu Wan</Heading>
      </Flex>

      <Flex align="center" justify="center" gap="4" mt="8">
        <Button colorScheme="purple">Compliments received</Button>
        <Button colorScheme="purple" variant="outline">
          Compliments sent
        </Button>
        <Button colorScheme="purple" variant="outline">
          Tags
        </Button>
        <Button colorScheme="purple" variant="outline">
          Users
        </Button>
      </Flex>
    </Box>
  );
}

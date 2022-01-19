import { Flex, Avatar, Text } from "@chakra-ui/react";
import { useUserComplimentsReceived } from "../../../hooks/useUserComplimentsReceived";

interface Compliment {
  id: string;
  userSender?: {
    name: string;
  };
  userReceiver?: {
    name: string;
  };
  tag: {
    name: string;
  };
  message: string;
  created_at: string;
}

interface ComplimentProps {
  compliments: Compliment[];
  type: "received" | "sent";
}

export function Compliment({ compliments, type }: ComplimentProps) {
  return (
    <>
      {compliments.map((compliment) => (
        <Flex align="center" gap="4">
          <Avatar
            bg="purple.400"
            size="md"
            name={
              type === "received"
                ? compliment.userSender.name
                : compliment.userReceiver.name
            }
          />
          <Flex direction="column" justify="center">
            <Text fontWeight="bold">
              {type === "received"
                ? compliment.userSender.name
                : compliment.userReceiver.name}
            </Text>
            <Text>
              {compliment.message} - <strong>{compliment.tag.name}</strong>
            </Text>
            <Text fontSize="sm" color="purple.400">
              {new Date(compliment.created_at).toLocaleString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Flex>
        </Flex>
      ))}
    </>
  );
}

import { VStack } from "@chakra-ui/react";
import { useUserComplimentsReceived } from "../../hooks/useUserComplimentsReceived";
import { useUserComplimentsSent } from "../../hooks/useUserComplimentsSent";
import { Compliment } from "./Compliment";

interface ComplimentsListProps {
  complimentType: "received" | "sent";
}

export function ComplimentsList({ complimentType }: ComplimentsListProps) {
  const receivedCompliments = useUserComplimentsReceived();
  const sentCompliments = useUserComplimentsSent();

  return (
    <VStack spacing="6">
      <Compliment
        compliments={
          complimentType === "received" ? receivedCompliments : sentCompliments
        }
        type={complimentType}
      />
    </VStack>
  );
}

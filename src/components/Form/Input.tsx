import { FormControl, FormLabel, Input as ChakraInput } from "@chakra-ui/react";

type InputProps = {
  name: string;
  label: string;
};

export function Input({ name, label }: InputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor={name} color="purple.50">
        {label}
      </FormLabel>
      <ChakraInput
        name={name}
        borderColor="purple.300"
        color="white"
        variant="filled"
        bg="gray.600"
        _hover={{
          bg: "gray.600",
        }}
        size="lg"
      />
    </FormControl>
  );
}

import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor={name} color="white">
        {label}
      </FormLabel>
      <ChakraInput
        name={name}
        id={name}
        borderColor="purple.300"
        color="white"
        variant="filled"
        bg="gray.600"
        _hover={{
          bg: "gray.600",
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}

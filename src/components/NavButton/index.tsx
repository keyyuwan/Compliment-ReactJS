import { Button, ButtonProps } from "@chakra-ui/react";

interface NavButtonProps extends ButtonProps {
  title: string;
  active: boolean;
}

export function NavButton({ title, active = false, ...rest }: NavButtonProps) {
  return (
    <Button
      colorScheme="purple"
      variant={active ? "solid" : "outline"}
      {...rest}
    >
      {title}
    </Button>
  );
}

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    purple: {
      "50": "#F2D5F8",
      "100": "#EAC8CA",
      "200": "#E6C0E9",
      "300": "#BFABCB",
      "400": "#8D89A6",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "purple.50",
        color: "gray.600",
      },
    },
  },
});

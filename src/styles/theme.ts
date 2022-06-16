import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        green: {
            500: "#B5C806",
            600: "#9EB708",
        },
        fonts: {
            heading: "Inter",
            body: "Inter",
        },
    }
})
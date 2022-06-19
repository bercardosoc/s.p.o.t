import { Flex, Img, Stack, Text } from "@chakra-ui/react"
import Logo from "../../assets/recycling-160925_640 1.svg"

export const Header = () => {
    return (
        <Flex
        flexDirection={["row", "row", "column-reverse", "column-reverse"]}
        m={["1.5rem 1rem", "0 auto", "2.5rem 3rem", "2.5rem 3rem"]}
        >
            <Img
                src={Logo}
                alt="Header logo"
                mt={["auto", "5", "5", "5"]}
            />
            <Stack
            
            >
                <Text
                    fontSize={"6xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    S.P.O.T.
                </Text>
                <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                >
                    Security Point to Output your Trash
                </Text>
            </Stack>
        </Flex>
    )
}
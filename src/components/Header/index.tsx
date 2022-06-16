import { Flex, Img, Stack, Text } from "@chakra-ui/react"
import Logo from "../../assets/recycling-160925_640 1.svg"

export const Header = () => {
    return (
        <Flex
        >
            <Img
                src={Logo}
                alt="Header logo"
            />
            <Stack
            
            >
                <Text
                    fontSize={"6xl"}
                    fontWeight={"bold"}
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
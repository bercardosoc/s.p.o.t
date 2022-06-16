import { ReactNode } from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "./AuthContext"
import { theme } from "../styles/theme"

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => (
    <AuthProvider>
        <ChakraProvider theme={theme} >
            {children}
        </ChakraProvider>
    </AuthProvider>
)
import { ReactNode } from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from "./AuthContext"

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => (
    <AuthProvider>
        <ChakraProvider>
            {children}
        </ChakraProvider>
    </AuthProvider>
)
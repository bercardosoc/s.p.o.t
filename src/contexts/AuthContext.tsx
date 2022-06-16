import { api } from "../services/api";
import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
    children: ReactNode
}

/* interface Address {
    zipCode: string 
    number: number 
    complement: string 
} 

interface User {
    id: string 
    name: string 
    email: string 
    address: Address
} */

interface Address {
    zipCode: string 
    number: number 
    complement: string 
} 

interface signUpCredentials {
    name: string 
    email: string
    password: string 
    address: {
        zipCode: string 
        number: number 
        complement: string 
    } 
}

interface AuthContextData {
    toSignUp: (credentials: signUpCredentials) => void 
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const toSignUp = (data: signUpCredentials) => {
        const { name, email, password, address } = data 
        console.log(data)
        api
        .post("/users/signup", 
        {
            name: name, 
            email: email,
            password: password,
            address: {
                zipCode: address.zipCode, 
                number: address.number, 
                complement: address.complement 
            }
        })
        .then((response) => {
            console.log("Criou o usuário")
            // Adicionar toast de sucesso
        })
        .catch((err) => {
            console.log(err)
            // Adicionar toast de fracasso
        })
    }

    return (
        <AuthContext.Provider
            value={{ toSignUp }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
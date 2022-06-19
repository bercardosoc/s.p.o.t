import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Flex, Text } from "@chakra-ui/react";
import { FormButton } from "../../components/Form/Button";

import { RiLockPasswordFill } from "react-icons/ri"
import { FaSearchLocation } from "react-icons/fa"
import { AiOutlineFieldNumber} from "react-icons/ai"
import { MdAlternateEmail, MdOutlineDriveFileRenameOutline, MdOutlineApartment } from "react-icons/md"
import { Header } from "../../components/Header";

export const Signup = () => {

    const { toSignUp } = useContext(AuthContext)

    
    // Ver se é necessário no front já que tem no back
    const schema = yup.object().shape({
        name: yup.string(), 
        email: yup.string(),
        password: yup.string(),
        address: yup.object().shape({
            zipCode: yup.string(),
            number: yup.number(),
            complement: yup.string(),
        })
    })
    
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm ({
        resolver: yupResolver(schema)
    })

    // tipar melhor essa any 
    const handleSignup = (data: any) => {
        console.log(data)
        toSignUp(data)
    }

    return (
        <Flex
        h={"100vh"}
        backgroundColor={"#e9ffdb"}
        m={"5 auto"}
        alignItems={["", "", "center", "center"]}
        flexDirection={["column", "column", "row", "row"]}
        >    
            <Header
            />
        <Flex
            as="form"
            flexDirection="column"
            m={["0 auto", "0 auto", "0 5rem", "0 5rem"]}
            onSubmit={handleSubmit(handleSignup)}        
            >
            <Text
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                margin={"1rem auto"}
            >
                Encontre um destino para o seu lixo e ajude os outros.
            </Text>
            <Input
                placeholder="Seu nome"
                error={errors.name}
                icon={MdOutlineDriveFileRenameOutline}
                {...register("name")}
            />
            <Input
                placeholder="Seu email"
                error={errors.email}
                {...register("email")}
                icon={MdAlternateEmail}
                />
            <Input
                placeholder="Sua senha"
                error={errors.password}
                icon={RiLockPasswordFill}
                {...register("password")}
            />
            <Input
                placeholder="Seu CEP"
                error={errors.zipCode}
                icon={FaSearchLocation}
                {...register("address.zipCode")}
                />
            <Input
                placeholder="Número da sua casa"
                error={errors.number}
                icon={AiOutlineFieldNumber}
                {...register("address.number")}
                />
            <Input
                placeholder="Complemento (casa, apt, etc)"
                error={errors.complement}
                icon={MdOutlineApartment}
                {...register("address.complement")}
                />
            <FormButton type="submit" >
                Enviar
            </FormButton>
        </Flex>
        </Flex>
    )
}

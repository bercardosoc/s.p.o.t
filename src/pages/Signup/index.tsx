import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Flex } from "@chakra-ui/react";
import { FormButton } from "../../components/Form/Button";

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
            as="form"
            flexDirection="column"
            onSubmit={handleSubmit(handleSignup)}        
        >
            <Input
                placeholder="Seu nome"
                error={errors.name}
                {...register("name")}
            />
            <Input
                placeholder="Seu email"
                error={errors.email}
                {...register("email")}
            />
            <Input
                placeholder="Sua senha"
                error={errors.password}
                {...register("password")}
            />
            <Input
                placeholder="Seu CEP"
                error={errors.zipCode}
                {...register("address.zipCode")}
            />
            <Input
                placeholder="Seu número"
                error={errors.number}
                {...register("address.number")}
            />
            <Input
                placeholder="Complemento (casa, apt, etc)"
                error={errors.complement}
                {...register("address.complement")}
            />
            <FormButton type="submit" >
                Enviar
            </FormButton>
        </Flex>
    )
}

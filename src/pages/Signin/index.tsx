import * as yup from "yup" 
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Flex } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Form/Input"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdAlternateEmail } from "react-icons/md"
import { FormButton } from "../../components/Form/Button"

export const Signin = () => {

    const { toSignIn } = useContext(AuthContext)

    const schema = yup.object().shape({
        email: yup.string(),
        password: yup.string()
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm ({
        resolver: yupResolver(schema)
    })

    const handleSignin = (data: any) => {
        console.log(data)
        toSignIn(data)
    }

    return (
        <Flex
            mt={5}
            flexDirection="column"    
        >
            <Header/>
            <Flex
                as="form"
                flexDirection="column"
                onSubmit={handleSubmit(handleSignin)}        
                m={"auto"}
                w={["90vw"]}
            >
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
                <FormButton type="submit">
                    Enviar
                </FormButton>
            </Flex>
        </Flex>

    )
}
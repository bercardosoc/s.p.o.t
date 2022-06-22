import * as yup from "yup" 
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Flex, Image, Link, Text } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Form/Input"
import { RiLockPasswordFill } from "react-icons/ri"
import { MdAlternateEmail } from "react-icons/md"
import { FormButton } from "../../components/Form/Button"
import Map from "../../assets/maps.png"

export const Signin = () => {

    const { toSignIn } = useContext(AuthContext)

    const schema = yup.object().shape({
        email: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório")
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm ({
        resolver: yupResolver(schema)
    })

    const handleSignin = (data: any) => {
        toSignIn(data)
    }

    return (
        <Flex
        h={"100vh"}
        backgroundColor={"#e9ffdb"}
        m={"5 auto"}
        alignItems={["", "", "center", "center"]}
        flexDirection={["column", "column", "row", "row"]}    
        >
            <Header/>
            <Flex
                as="form"
                flexDirection="column"
                m={["0 auto", "0 auto", "0 5rem", "0 5rem"]}
                onSubmit={handleSubmit(handleSignin)}        
            >
            <Text
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
            >
                Acesse a sua conta e descubra onde você pode contribuir.
            </Text>
            <Image
                margin={"0 auto"}
                width={["75vw","50vw","50vw","25vw"]}
                src={Map}
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
                    type="password"
                />
                <FormButton type="submit">
                    Enviar
                </FormButton>
                <Text
                mt={"0.5rem"}
                textAlign={"center"}
            >
                Ainda não possui conta? Faça seu <Link color={"teal"} href="/signup">cadastro</Link>
            </Text>
            </Flex>
        </Flex>

    )
}
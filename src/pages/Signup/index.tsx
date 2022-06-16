import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
        <form
            onSubmit={handleSubmit(handleSignup)}        
        >
            <input
                {...register("name")}
                placeholder="name"
            />
            <input
                {...register("email")}
                placeholder="email"
            />
            <input
                {...register("password")}
                placeholder="password"
            />
            <input
                {...register("address.zipCode")}
                placeholder="zipCode"
            />
            <input
                {...register("address.number")}
                placeholder="number"
            />
            <input
                {...register("address.complement")}
                placeholder="complement"
            />
            <button type="submit" >
                Submit
            </button>
        </form>
    )
}

import { FieldError } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
  Icon,
  forwardRef,
} from "@chakra-ui/react"

import { ForwardRefRenderFunction, useCallback, useEffect, useState } from "react";

import { IconType } from "react-icons/lib";

interface InputProps extends ChakraInputProps {
    name: string
    label?: string 
    placeholder?: string
    error?: FieldError | null 
    icon?: any // type better 
}

type inputVariationOptions = {
    [key: string]: string 
}

const inputVariation: inputVariationOptions = {
    error: "red.500",
    default: "green.500",
    focus: "green.600",
    // filled: "green.500",
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, icon: Icon, error = null, ...rest }, ref ) => {
    
    const [value, setValue] = useState("")
    const [variation, setVariation] = useState("default")

    useEffect(() => {
        if (error) {
            return setVariation("error")
        }
    }, [error])

    const handleInputFocus = useCallback(() => {
        if (!error) {
            setVariation("focus")
        }
    }, [error])
    
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

            <InputGroup>
            {Icon && (
                <InputLeftElement color={inputVariation[variation]}>
                    <Icon/>
                </InputLeftElement>
            )}
            
            <ChakraInput
                id={name}
                name={name}
                placeholder={name}
                onChangeCapture={(e) => setValue(e.currentTarget.value)}
                onFocus={handleInputFocus}
                borderColor={inputVariation[variation]}
                color={inputVariation[variation]}
                variant="outline"
                _placeholder={{ color: "gray.500" }}
                ref={ref}
                {...rest}
            />
            
            {!!error && (
                <FormErrorMessage color={"red"}>{error.message}</FormErrorMessage>
            )}
            </InputGroup>
        </FormControl>

    )
}

export const Input = forwardRef(InputBase)
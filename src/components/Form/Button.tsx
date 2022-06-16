import { Button, ButtonProps } from '@chakra-ui/react'

export const FormButton = ({ children, ...rest }: ButtonProps) => {
    return (
        <Button
            {...rest}
            colorScheme="green.600"
            variant="solid"
            bg="green.600"
        >
            {children}
        </Button>
    )
}
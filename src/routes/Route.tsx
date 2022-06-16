import { ComponentType } from "react";
import { RouteProps, Route as ReactRoute } from "react-router-dom";

interface Props extends RouteProps {
    isPrivate?: boolean 
    component: ComponentType
}

export const Route = ({ isPrivate = false, component: Component, ...rest }: Props ) => {
    
    return (
        <ReactRoute 
            {...rest} 
            render = {() => <Component/>}
        />
    )
}
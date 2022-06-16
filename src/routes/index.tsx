import { Switch } from "react-router-dom"
import { Signin } from "../pages/Signin"
import { Signup } from "../pages/Signup"
import { Route } from "./Route"

export const Routes = () => {

    return (
        <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
        </Switch>
    )
}
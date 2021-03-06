import { Switch } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { Home } from "../pages/Home"
import { Signin } from "../pages/Signin"
import { Signup } from "../pages/Signup"
import { Route } from "./Route"

export const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/dashboard" component={Dashboard} isPrivate/>
        </Switch>
    )
}
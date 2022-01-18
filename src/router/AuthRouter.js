import React from 'react'
import RegisterForm from "../components/RegisterForm";
import Login from "../Login";
import { Switch, Route, Redirect } from 'react-router-dom';


export const AuthRouter = () => {
    return (
        <Switch>
            
            <Route 
                path = "/auth/login"
                component = { Login }
            />

            <Route 
                path = "/auth/register"
                component = { RegisterForm }
            />

            <Redirect to = "/auth/login"/>


        </Switch>
    )
}

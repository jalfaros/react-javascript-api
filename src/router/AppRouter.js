import React, { useEffect, useState } from 'react';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { 
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import HomeScreen from '../components/HomeScreen';
 
export const AppRouter = () => {

    

    const [checking, setChecking ] =  useState( true );
    const [ isLogged, setIsLogged ] = useState( JSON.parse( localStorage.getItem('isLogged' || false) ) );


    useEffect( () => {

        if ( isLogged ){
            setIsLogged( isLogged );
        }else{
            setIsLogged( false );
        }

        setChecking(false);

    }, [ isLogged ])



    if ( checking ){
        return (
            <h3>Loading...</h3>
            )
        }


    return (
        <Router>
            <div>
                <Switch>


                    <PublicRoute 
                        isAuth={ isLogged }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    
                    <PrivateRoute
                        exact
                        isAuth={ isLogged }
                        path="/"
                        component={ HomeScreen }
                    />

                    <Redirect to="/auth/login" />  


                </Switch>
            </div>
        </Router>
    )
}

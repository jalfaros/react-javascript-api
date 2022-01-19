import React from 'react';
import './styles/login.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from './hooks/useForm';
import Swal from 'sweetalert2'
 

export function Login() {

    const [ formValues, handleInputChange, handleReset ] = useForm({
        userName: '',
        pass: ''
    });

    const { userName , pass } = formValues;

  
    const handleLogin = async ( e ) => {
        e.preventDefault();

        const response = await fetch( 'http://localhost:8080/api/auth/login',{
            method: 'POST',
            body: JSON.stringify( formValues ),
            headers: {
                'Content-Type' :'application/json'
            }
        });
        
        handleFetchInfo( await response.json() )
    }


    const handleFetchInfo = ( { code, content, token = '' } ) => {
        
        if( code !== 200 ){
            Swal.fire({
                text: 'Usuario o contraseña incorrecta',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            })
            return;
        }

        localStorage.setItem('isLogged', JSON.stringify(true));
        localStorage.setItem('content', JSON.stringify( content ));
        localStorage.setItem('token', JSON.stringify( token ));
        window.location.replace('/');
    };



    return (    
        <div className="formContainer">
            <div className="containerTitle">
                <p>
                    Login de usuario
                </p>                
                <hr />

            </div>

            
                <form className="formGrid" autoComplete="off" onSubmit = { handleLogin }>

                    <label>Usuario<span>*</span></label>
                    <input  type="text" 
                            placeholder= "Nombre de usuario"
                            name = "userName"
                            required
                            onChange={ handleInputChange }
                            value = {userName}                   
                    />
                    
                    <label >Contraseña<span>*</span></label>
                    
                    <input  type="password"
                            name = "pass"
                            placeholder = "Su contraseña"
                            required
                            onChange={ handleInputChange }
                            value = { pass }
                    />


                    <hr />

                    <Button variant="outline-danger" className = "button" onClick = { handleReset } >
                        Limpiar datos
                    </Button>

                    <Button className = "button" type="submit" >
                        Iniciar Sesión
                    </Button>

                    <span>
                        No tienes una cuenta? <Link to="/auth/register">Crear cuenta</Link>
                    </span>

                </form>
            </div>
    )
}

export default Login;

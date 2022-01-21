import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from './hooks/useForm';
import { authLogin } from './components/services/authService'
import { swalAlert } from './components/services/swalAlert';
import './styles/login.css';
 

export function Login() {

    const [ formValues, handleInputChange, handleReset ] = useForm({
        userName: '',
        pass: ''
    });

    const { userName , pass } = formValues;

  
    const handleLogin = async ( e ) => {

        e.preventDefault();

        const { code, content, token = '' } =  await authLogin( { formValues } );
        
        if( code !== 200 ){
            swalAlert('Usuario o contraseña incorrecta', 'error'); 
            return;
        }

        // Mejorar la administración de esto

        localStorage.setItem('isLogged', JSON.stringify(true));
        localStorage.setItem('content', JSON.stringify( content ));
        localStorage.setItem('token', JSON.stringify( token ));
        window.location.replace('/');
        
    }


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

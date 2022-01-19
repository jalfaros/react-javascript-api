import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

import '../styles/login.css'
import Swal from 'sweetalert2'

const RegisterForm = () => {

    const [ values, handleInputChange, resetForm ] = useForm({
        userName: '',
        pass: '',
        firstName: '',
        lastName: ''
    });

    const { userName, pass, firstName, lastName } = values;

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        try {
            const response = await fetch( 'http://localhost:8080/api/users', {
                method: 'POST',
                body: JSON.stringify( values ),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            handleFetchInfo( await response.json() ); 

        }catch( error ){
            console.log('Error: ', error)
        }
    };

    const handleFetchInfo = ( { code, content, token = '' } ) => {

        // Se encadena distinto, se debe de revisar la encadenación del success porque deja pasar al home sin credenciales
    
        if ( code === 500 ){
            Swal.fire({
                text: 'Este usuario ya se encuentra registrado',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false
            })
        }else{

            localStorage.setItem('content', JSON.stringify( content ));
            localStorage.setItem('isLogged', JSON.stringify( true ));
            localStorage.setItem('token', JSON.stringify( token ));
            Swal.fire({
                text: 'Usuario registrado correctamente',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });
            
            window.location.reload()
  
        }
    
    }

  
    return (

        <div className="formContainer">
            <div className="containerTitle">
                <p>
                    Registro de usuario
                </p>
                <hr />
            </div>

            
            <form className =  "formGrid" autoComplete="off" onSubmit = { handleSubmit }>

                <label>Usuario <span>*</span></label>
                <input  type="text"
                        name="userName"
                        placeholder="Nombre de usuario"
                        required
                        onChange = { handleInputChange }
                        value = { userName }
                        
                />

                <label>Contraseña <span>*</span></label>
                <input  type="password"
                        name="pass"
                        placeholder="Contraseña"
                        required
                        onChange = { handleInputChange }
                        value = { pass }
                        
                />
                 
                <label>Nombre <span>*</span></label>
                <input  type="text"
                        name="firstName"
                        placeholder="John"
                        required
                        onChange = { handleInputChange }
                        value = { firstName }
                        
                />
                
                <label>Apellidos <span>*</span></label>
                <input  type="text"
                        name="lastName"
                        placeholder="Doe"
                        required
                        onChange = { handleInputChange }
                        value = { lastName }
                />

                <hr />

                <Button className="button" variant = "outline-danger" onClick = { resetForm }>Limpiar datos</Button>
                <Button className="button" variant = "primary" type="submit">Registrarse</Button>

                <span>
                    Ya tienes una cuenta? <Link to="/auth/login">Iniciar sesión</Link>
                </span>
            </form>

        </div>
    )
}

export default RegisterForm;

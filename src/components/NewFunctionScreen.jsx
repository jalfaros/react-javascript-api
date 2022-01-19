import React, { useState } from 'react';
import NewFunctionForm from './NewFunctionForm';
import { NewCategory } from './ModalCategory/NewCategory'
import { useForm } from '../hooks/useForm';
import { Card } from 'react-bootstrap'
import Swal from 'sweetalert2';
import '../styles/function.css';

const BASEURL = 'http://localhost:8080/api/'

const NewFunctionScreen = () => {

    const [ show, setShow ] = useState(false);

    const [validator, setValidator] = useState({})
    const [categorys, setCategorys] = useState([]);
        
    const [ formValues, handleInputChange, reset ] = useForm({
        nombreFuncion: '',
        descripcion: '',
        codigoFuncion: '',
        idCategoria: ''
    });

    const validate = () => {
        let errorNameFunct = "";
        let errorDescFunct = "";
        let errorCodeFunct = "";
        let errorCateFunct = "";
        (!formValues.nombreFuncion) && (errorNameFunct = "El nombre de la función es requerido");
        (!formValues.descripcion  ) && (errorDescFunct = "La descripción de la función es requerido");
        (!formValues.codigoFuncion) && (errorCodeFunct = "El código de la función es requerido");
        (!formValues.idCategoria  ) && (errorCateFunct = "La categoría de la función es requerido");

        if (errorNameFunct || errorDescFunct || errorCodeFunct || errorCateFunct) {
            
            setValidator({errorNameFunct, errorDescFunct, errorCodeFunct, errorCateFunct});
            return true; 
        };
        return false;
    }

    
    const handleSubmit = ( e ) => {
        e.preventDefault();

        if(validate()){
            return;
            
        }else{

            try {
                const func = eval(`( ${formValues.codigoFuncion})`);                
                if( typeof func !== 'function' ) throw new Error('No estás declarando una función');
                
            
                fetch( `${BASEURL}function` ,  {
                    method: 'POST',
                    body: JSON.stringify(formValues),
                    headers: {
                        'Content-Type' : 'application/json',
                        'x-token' : JSON.parse( localStorage.getItem('token') ) || ''   
                    }
                })
                .then(data => data.json())
                .then(( { code } ) => {
                        if(code === 200){
                            Swal.fire({
                                text: `Funcion "${formValues.nombreFuncion}" creada.`,
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setValidator({});
                            reset();
                            return;
                        }
                })
                .catch(console.warn);

            } catch (err) {
                Swal.fire({
                    title: 'Upps...',
                    text : 'Errores sintácticos o no está declarando una función',
                    icon : 'warning',
                    timer: 1500,
                    showConfirmButton: false
                });    
            }

        }

    };

    const handleModalSubmit = async ( e ) => {

        e.preventDefault();

        try{
            let response = await fetch(  `${BASEURL}category` ,  {
                method: 'POST',
                body: JSON.stringify({nombreCategoria: e.target[0].value }),
                headers: {
                    'Content-Type' : 'application/json',
                    'x-token' : JSON.parse( localStorage.getItem('token') ) || ''   
                }
            });

            handleFetchModal( await response.json() );

        }catch( err ){
            console.log( err )
        }
    };

    const handleFetchModal = ( {code, content = ''} ) => {

        if ( code !== 200 ){

            Swal.fire({
                icon: 'error',
                text: content.errors[1],
                timer: 1500,
                showConfirmButton: false
            });
            return;
        };
        setCategorys([...categorys, content[0]]);
        
        // Categorías propias del usuario, se deben de devolver todas las del id correspondiente
        setShow( !show )
    };


    const handleShowModal = () => {
        setShow( !show )
    };


    return (
        
        <Card>
            <Card.Title className='text-center' style={{ marginTop: '10px' }}>
                Nueva función
            </Card.Title>
            <hr />
            <Card.Body>

            <NewCategory  
                show = { show }
                setShow = { setShow }
                handleModalSubmit={ handleModalSubmit }
                
                
            />

            <NewFunctionForm 
                handleShowModal   = { handleShowModal   }
                formValues        = { formValues        }
                handleSubmit      = { handleSubmit      }
                handleInputChange = { handleInputChange }
                validator         = { validator         }
                categorys         = { categorys         }
                setCategorys      = { setCategorys      }
            />

            </Card.Body>
        </Card>
    )
}

export default NewFunctionScreen;

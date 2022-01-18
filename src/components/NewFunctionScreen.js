import React, { useState } from 'react';
import { Card } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { NewCategory } from '../components/ModalCategory/NewCategory'
import { useForm } from '../hooks/useForm';
import '../styles/function.css';
import NewFunctionForm from './NewFunctionForm';


const BASEURL = 'http://localhost:8080/api/functions'

const NewFunctionScreen = () => {

    const [ show, setShow ] = useState(false);
        
    const [ formValues, handleInputChange ] = useForm({
        nombreFuncion: '',
        descripcion: '',
        codigoFuncion: '',
        idCategoria: "0"
    });

    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log( formValues )
        //Fetch al guardar función
    };

    const handleModalSubmit = async ( e ) => {

        e.preventDefault();

        try{
            let response = await fetch( BASEURL + '/newCategory',  {
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

    const handleFetchModal = ( response ) => {

        if ( response.code !== 200 ){

            const { content } = response;

            Swal.fire({
                icon: 'error',
                text: content.errors[1],
                timer: 1500,
                showConfirmButton: false
            });
            return;
        };
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
                handleShowModal = { handleShowModal }
                formValues = { formValues }
                handleSubmit = { handleSubmit }
                handleInputChange={ handleInputChange }
            />

            </Card.Body>
        </Card>
    )
}

export default NewFunctionScreen;

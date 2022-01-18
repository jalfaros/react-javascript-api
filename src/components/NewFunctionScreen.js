import React, { useState } from 'react';
import { Card } from 'react-bootstrap'
import { NewCategory } from '../components/ModalCategory/NewCategory'
import { useForm } from '../hooks/useForm';
import '../styles/function.css';
import NewFunctionForm from './NewFunctionForm';

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

    const handleModalSubmit = ( e ) => {
        e.preventDefault();

        //Fetch al nueva categoría
        console.log( e.target[0].value )
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

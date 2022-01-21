import React, { useState } from 'react';
import NewFunctionForm from './NewFunctionForm';
import { NewCategory } from './ModalCategory/NewCategory'
import { useForm } from '../hooks/useForm';
import { Card } from 'react-bootstrap'
import { postFunction, postNewCategory } from './services/modal';
import { swalAlert } from './services/swalAlert';
import '../styles/function.css';


const NewFunctionScreen = () => {

    const [ show, setShow ] = useState(false);

    const [categorys, setCategorys] = useState([]);
        
    const [ formValues, handleInputChange ] = useForm({
        nombreFuncion: '',
        descripcion: '',
        codigoFuncion: '',
        idCategoria: ''
    });


    
    const handleSubmit = async ( e ) => {
        e.preventDefault();

        try{ 

            const evalFunction = Function( formValues.codigoFuncion ); 
            if ( typeof evalFunction !== 'function') throw new Error();

            const { code } = await postFunction({ formValues });

            if( code !== 200 ) return;

            swalAlert(`Función "${ formValues.nombreFuncion }" creada correctamente`, 'success')


        }catch( evalErr ){

            swalAlert('Errores sintácticos de la función o no estás declarando una!', 'warning')
        }        
    };

    const handleModalSubmit = async ( e ) => {
        
        e.preventDefault();

        const { code, content  } =  await postNewCategory({ categoryName: e.target[0].value })

        if ( code !== 200 ){
            swalAlert( content.errors[1], 'error' );
            return;
        }

        setCategorys([
            ...categorys,
            content[0]
        ]);

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
                setShow             = { setShow }   
                formValues          = { formValues        }
                handleSubmit        = { handleSubmit      }
                handleInputChange   = { handleInputChange }
                categorys           = { categorys         }
                setCategorys        = { setCategorys      }
            />

            </Card.Body>
        </Card>
    )
}

export default NewFunctionScreen;

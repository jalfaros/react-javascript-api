import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { useForm } from '../hooks/useForm';
import '../styles/function.css';

const NewFunctionScreen = () => {

    const [ formValues, handleInputChange ] = useForm({
        nombreFuncion: '',
        descripcion: '',
        codigoFuncion: '',
        idCategoria: "0"
    });

    const { nombreFuncion, descripcion, codigoFuncion, idCategoria } = formValues;

    const handleSubmit = ( e ) => {
        e.preventDefault();

        console.log( formValues )
    };

    // useEffect(() => {
    //     console.log('ejecución')
    //     try {
    //         eval( codigoFuncion )
    //     }catch( err ){
    //         console.log( err )
    //     }
    // }, [codigoFuncion])


    return (
        <Card>
            <Card.Title className='text-center' style={{ marginTop: '10px' }}>
                Nueva función
            </Card.Title>
            <hr />
            <Card.Body>
                
            <form className = "formFlex" onSubmit={ handleSubmit } autoComplete='off'>

                <label htmlFor="nombreFuncion">Nombre</label>
                <input  type="text" 
                        name = "nombreFuncion"
                        id = "nombreFuncion"
                        placeholder='Fibonacci...'
                        onChange={ handleInputChange }
                        value = { nombreFuncion }
                />

                <label htmlFor="descripcion">Descripción<span>*</span></label>
                <input  type="text" 
                        name = "descripcion"
                        id = "descipcion"
                        placeholder='Recursiva...'
                        required
                        onChange={ handleInputChange }
                        value = { descripcion }
                />

                <label htmlFor="idCategoria">Categoría<span>*</span></label>

                <select name="idCategoria" id="idCategoria" required onChange={handleInputChange} value = { idCategoria }>

                </select>

                <label htmlFor="codigoFuncion">Código<span>*</span></label>
                <textarea   name="codigoFuncion" 
                            id="codigoFuncion" 
                            cols="5" 
                            rows="5" 
                            required
                            onChange={ handleInputChange }
                            value = { codigoFuncion }
                />


                <Button variant="outline-primary" type="submit"> 
                    <i className="far fa-save"></i>
                </Button>

            </form>

            </Card.Body>
        </Card>
    )
}

export default NewFunctionScreen;

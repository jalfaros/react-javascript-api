import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';



export const NewCategory = ( { show, setShow, handleModalSubmit } ) => {


    const [ formValue, handleInputChange ] = useForm({
        nombreCategoria : ''
    })

    const { nombreCategoria } = formValue;
    
    const handleModalClose = () => {
        setShow( !show )
    }


    return (
        <Modal show = { show } centered>
            <Modal.Header>
                <Modal.Title>Nueva categoría</Modal.Title>
                <hr />
            </Modal.Header>

            <Modal.Body>
                <form className='formFlex' onSubmit={ handleModalSubmit } autoComplete='off'>
                    <label htmlFor="">Nombre de la categoría</label>
                    <input  type="text" 
                            placeholder= "Ej: recursivas"
                            required
                            name='nombreCategoria'
                            onChange={ handleInputChange }
                            value={ nombreCategoria }
                    />
                    
                    <Button variant = "danger" onClick={ handleModalClose }>
                        Cerrar
                    </Button>

                    <Button variant = "primary" type="submit">
                        Agregar
                    </Button>


                </form>
            </Modal.Body>
        </Modal>
    )
}



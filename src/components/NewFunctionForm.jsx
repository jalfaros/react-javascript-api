import React from 'react';
import { Button } from 'react-bootstrap'
import '../styles/function.css';

const NewFunctionForm = ({ formValues,handleInputChange,handleSubmit,handleShowModal }) => {



    const { nombreFuncion, descripcion, codigoFuncion, idCategoria } = formValues;



    return (
        <form className = "formFlex" onSubmit={ handleSubmit } autoComplete='off' >
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
                    <option value="1">Nepe</option>
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


                <Button variant="outline-success" type="button" onClick={ handleShowModal }> 
                    <i className="fa fa-plus"></i>
                </Button>

                <Button variant="outline-primary" type="submit"> 
                    <i className="far fa-save"></i>
                </Button>
        </form>
    )
}

export default NewFunctionForm

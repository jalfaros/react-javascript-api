import { Button }   from 'react-bootstrap'
import React, { useEffect, useState }        from 'react';
import '../styles/function.css';


const BASEURL = 'http://localhost:8080/api/category';
const NewFunctionForm = ({ formValues,handleInputChange,handleSubmit,handleShowModal, validator, categorys, setCategorys }) => {

    const { nombreFuncion, descripcion, codigoFuncion, idCategoria } = formValues;
    
    const getCategorys = () =>{

        fetch(BASEURL, {method: 'get', headers: {'Content-Type' : 'application/json','x-token': JSON.parse(localStorage.getItem('token')) } })
        .then( data => data.json())
        .then( ({success, content =''}) => {
            if(success === "1"){
                setCategorys(content);
            }
        })
        .catch( console.warn );
    }

    useEffect(() => {
        getCategorys();
    }, [])

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
                {
                    validator.errorNameFunct &&    
                        <span className='text-danger'>
                            <small> {validator.errorNameFunct} </small>
                            <hr />
                        </span>
                }

                <label htmlFor="descripcion">Descripción</label>
                <input  type="text" 
                        name = "descripcion"
                        id = "descipcion"
                        placeholder='Recursiva...'
                        onChange={ handleInputChange }
                        value = { descripcion }
                />
                {
                    validator.errorDescFunct && 
                        <span className='text-danger'>
                            <small>{validator.errorDescFunct}</small>
                            <hr />
                        </span>
                }

                <label htmlFor="idCategoria">Categoría</label>

                <select 
                    name="idCategoria" 
                    id="idCategoria" 
                    onChange={handleInputChange} 
                    value = { idCategoria }>
                    <option>Seleccionar categoría</option>
                    {
                        categorys.map( ( { id, nameCategory } ) => <option key={id} value={id}>{nameCategory}</option> )
                    }

                </select>
                {
                    validator.errorCateFunct && 
                        <span className='text-danger'>
                            <small>{validator.errorCateFunct}</small>
                            <hr />
                        </span>
                }

                <label htmlFor="codigoFuncion">Código</label>
                <textarea   name="codigoFuncion" 
                            id="codigoFuncion" 
                            rows="7" 
                            className='linedTextArea'
                            onChange={ handleInputChange }
                            value = { codigoFuncion }
                />
                {
                    validator.errorCodeFunct && 
                        <span className='text-danger'>
                            <small>{validator.errorCodeFunct}</small>
                            <hr />
                        </span>
                }


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

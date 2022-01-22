import { Button }   from 'react-bootstrap'
import React, { useEffect } from 'react';
import { getCategories } from './services/function';
import '../styles/function.css';



const NewFunctionForm = ({ formValues,handleInputChange,handleSubmit, setShow, categorys, setCategorys }) => {

    const { nombreFuncion, descripcion, codigoFuncion, idCategoria } = formValues;

    const getCats = async () => {
        const { code, content } = await getCategories();

        if ( code !== 200 ){
            return;
        }

        setCategorys( content )

    };
  
    useEffect(() => {
        getCats();
    },[])

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
           

                <label htmlFor="descripcion">Descripción</label>
                <input  type="text" 
                        name = "descripcion"
                        id = "descipcion"
                        placeholder='Recursiva...'
                        onChange={ handleInputChange }
                        value = { descripcion }
                />
            

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
         

                <label htmlFor="codigoFuncion">Código</label>
                <textarea   name="codigoFuncion" 
                            id="codigoFuncion" 
                            rows="7" 
                            className='linedTextArea'
                            onChange={ handleInputChange }
                            value = { codigoFuncion }
                />
    
                <Button variant="outline-success" type="button" onClick={ setShow }> 
                    <i className="fa fa-plus"></i>
                </Button>

                <Button variant="outline-primary" type="submit"> 
                    <i className="far fa-save"></i>
                </Button>
        </form>
    )
}

export default NewFunctionForm

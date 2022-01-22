import React from 'react';
import { useForm } from '../../hooks/useForm'
import { getQuerySearch } from '../services/searchBox';

import '../../styles/searchBox.css'


const SearchBox = ({ setFunctions }) => {


    const [ formValue, handleInputChange ] = useForm({
        search : ''
    });

    const { search } = formValue;


    const handleSubmit = async ( e ) => {

        // Manejar un mensaje de error cuando no se encuentran coincidencias
        e.preventDefault();

        const data = await getQuerySearch( { search } ); 

        if( data.code !== 200 ){
            return;
        }
        setFunctions( data.content ); 
    };


  return( 

    <form className='searchBox' autoComplete='off' onSubmit={ handleSubmit }>
        <input type="text" 
                placeholder='Buscar funciones categoría, usuario, nombre'
                name="search"
                value={ search }
                onChange={ handleInputChange }
                required
        />
    </form>

  
)};

export default SearchBox;

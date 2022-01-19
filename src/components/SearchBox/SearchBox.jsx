import React from 'react';
import { useForm } from '../../hooks/useForm'

import '../../styles/searchBox.css'

const URLBASE = 'http://localhost:8080/api/function';

const SearchBox = ({ setFunctions }) => {





    const [ formValue, handleInputChange ] = useForm({
        search : ''
    });

    const { search } = formValue;


    const handleSubmit = async ( e ) => {
        e.preventDefault();

        let response = await fetch( `${ URLBASE }?search=${ search }`, {
            headers: {
                'x-token' : JSON.parse( localStorage.getItem('token') ) || ''
            }
        });
        handleSearchFetch( await response.json() )
    };

    const handleSearchFetch = ( data ) => {
        if ( data.code === 200 ){
            setFunctions(
                data.content
            )
        }
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

import React, {  useState } from 'react'
import { Card } from 'react-bootstrap'
import SearchBox from './SearchBox/SearchBox'
import FunctionInfo from './SearchBox/FunctionInfo'
import '../styles/search.css'




const SearchFunctionScreen = () => {

    const [functions, setFunctions] = useState([]);


    return (
        <Card>
            <Card.Title className='text-center' style={{ marginTop: '10px' }}>
                Búsqueda de funciones
            </Card.Title>
            <hr />
            <Card.Body>

                <SearchBox 
                    setFunctions = { setFunctions }
                />

                {
                    (functions.length !== 0) 
                    &&
                    <FunctionInfo 
                    data = { functions }
                    />
                }

            </Card.Body>
        </Card>
    )
}

export default SearchFunctionScreen;

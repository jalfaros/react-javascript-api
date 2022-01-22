import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap'
import { CopyBlock, dracula } from "react-code-blocks";






const FunctionInfo = ({ data }) => {

    const [ fnCode, setFnCode ] = useState( null );


    useEffect(() => {
        setFnCode( null )
    }, [ data ])

  return (

    <Container className = "mt-4">
        <Table className= "table-striped table-bordered">
            <thead className= "text-center">
                <tr>
                    <td>Id</td>
                    <td>Creador</td>
                    <td>Categoría</td>
                    <td>Descripción</td>
                    <td className='text-center'>Acción</td>
                </tr>
            </thead>

            <tbody className= "text-center">
                {
                    data.map( ( { idFunction,userName, nameCategory, functionDescription, FunctionCode: fnCode } ) => {
                        return (<tr key = { idFunction }>
                            <td>{ idFunction }</td>
                            <td>{ userName }</td>
                            <td>{ nameCategory }</td>
                            <td>{ functionDescription }</td>
                            <td>
                                <Button variant='outline-primary'  onClick={ () => setFnCode( fnCode ) }>
                                    <i className='fa fa-eye'></i>
                                </Button>
                            </td>
                        </tr>)    
                    })
                }
            </tbody>
        </Table>

        {
            (fnCode) 

            &&  

            <CopyBlock 
            theme = { dracula }
            language = "javascript"
            text = { fnCode }
            showLineNumbers = {true}
            />
        }
   
    </Container>
)};

export default FunctionInfo;

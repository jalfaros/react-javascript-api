import { VARIABLES } from '../../config'

const URL_BASE = VARIABLES.URL_BASE;


export const postNewCategory = async ({ categoryName }) => {

    try{
        let response = await fetch(`${URL_BASE}/category`,  {
            method: 'POST',
            body: JSON.stringify({nombreCategoria: categoryName }),
            headers: {
                'Content-Type' : 'application/json',
                'x-token' : JSON.parse( localStorage.getItem('token') ) || ''   
            }
        });

        return await response.json();

    }catch( err ){
        console.log( err )
    }
};


export const postFunction = async ( { formValues } ) => {

    try{

        const response = await fetch( `${URL_BASE}/function` ,  {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type' : 'application/json',
                'x-token' : JSON.parse( localStorage.getItem('token') ) || ''   
            }
        });
        
        return await response.json();
        
    }catch( err ){

    }
}; 

import { VARIABLES } from "../../config";


const URL_BASE = VARIABLES.URL_BASE;


export const getQuerySearch = async ({ search }) => {

    try{
        let response = await fetch( `${ URL_BASE }/function?search=${ search }`, {
            headers: {
                'x-token' : JSON.parse( localStorage.getItem('token') ) || ''
            }
        });

        return await response.json();
    
    }catch( err ){
        console.log( err )
    }
};

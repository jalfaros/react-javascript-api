import { VARIABLES } from "../../config";

const BASE_URL = VARIABLES.URL_BASE;

export const authNewUser = async ({ values }) => {

    console.log( BASE_URL )
    try {
        
        const response = await fetch( `${BASE_URL}/users`, {
            method: 'POST',
            body: JSON.stringify( values ),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
       
    }catch( error ){
        console.log('Error: ', error)
    }
};


export const authLogin = async ({ formValues }) => {

    try{       
        const response = await fetch( `${ BASE_URL }/auth/login`,{
            method: 'POST',
            body: JSON.stringify( formValues ),
            headers: {
                'Content-Type' :'application/json'
            }
        });

        return await response.json();

    }catch( err ){
        console.log( err)
    }
    

}
import { VARIABLES } from "../../config";

const URL_BASE = VARIABLES.URL_BASE;

  
export const getCategories = async ( ) =>{

    try {

        const response = await fetch(`${URL_BASE}/category`, {
            headers: {
                'Content-Type' : 'application/json',
                'x-token': JSON.parse(localStorage.getItem('token')) } 
        });


        return await response.json();
        

    }catch( err){ 
        console.log( err )
    }
    
}

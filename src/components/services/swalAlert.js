import Swal from 'sweetalert2';



export const swalAlert = ( text, icon ) => { 

    Swal.fire({
        text: text,
        icon: icon,
        timer: 1000,
        showConfirmButton: false
    })
};
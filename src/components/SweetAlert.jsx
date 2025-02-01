import Swal from 'sweetalert2'

export const SweetAlert = (message) => {

    Swal.fire({
        title: 'Info!',
        text: message,
        icon: 'info',
        confirmButtonText: 'Cool'
      })

}
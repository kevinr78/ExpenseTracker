import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const TOAST_COLOR_MAP = {
    success: '#55a630',
    error: '#f94144',
    warning: '#f48c06',
}

function showSuccessToast(message){
    return  Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className:'bg-green-500',
        /* style: {
          background: TOAST_COLOR_MAP.success,
        }, */
       
      }).showToast();
}

function showErrorToast(message){
    return  Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: TOAST_COLOR_MAP.error,
        },
       
      }).showToast();
}

export {
    showSuccessToast,showErrorToast
}
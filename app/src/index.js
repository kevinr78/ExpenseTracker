import {f_login_user} from "../features/Registration/register";
import APIRequest from "../utils/APIRequest";
import { showErrorToast,showSuccessToast } from "../utils/Toast";

const login_form =document.getElementById('login_form');
const signin_form =document.getElementById('signin_form');
const  signinContainer = document.getElementById('signin_form_container');
const loginContainer = document.getElementById('login_form_container');
const login_btn_link =document.getElementById('login_link');
const signin_btn_link =document.getElementById('signin_link');

login_btn_link.onclick = function(){
    loginContainer.style.display='flex';
    signinContainer.style.display='none'
}


signin_btn_link.onclick = function(){
    loginContainer.style.display='none';
    signinContainer.style.display='flex'
}

signin_form.onsubmit = async(e)=>{
    e.preventDefault();
    const getAPIResponse  =  await f_send_API_request(signin_form,'register');
    if(!getAPIResponse.ok){
        showErrorToast(getAPIResponse.message)
        return ;
    }
    showSuccessToast(getAPIResponse.message);
    const {token, user} = getAPIResponse;
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user.user_name));
}

login_form.onsubmit= async (e)=>{
    e.preventDefault();
    const getAPIResponse  =await f_send_API_request(login_form,'login');
    if(!getAPIResponse.ok){
        showErrorToast(getAPIResponse.message)
        return ;
    }
    showSuccessToast(getAPIResponse.message);
    const {token, user} = getAPIResponse;
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user.user_name));
}




async function f_send_API_request(formObject,endpoint){
    const formData = Object.fromEntries(new FormData(formObject));
    const requestObject = new APIRequest('POST',formData,endpoint)
    const apiResponse =await  requestObject.sendRequest();
    
    return apiResponse;
}
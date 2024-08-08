import { showErrorToast,showSuccessToast } from "../../utils/Toast";
import APIRequest from "../../utils/APIRequest";

const accountBalance = document.getElementById('account_balance');
const accountName = document.getElementById('account_name');
const accountType = document.getElementById('account_type');
const saveAccountBtn = document.getElementById('save_account');
const updateAccountBtn = document.getElementById('upadate_account');
const toAccOptionList =document.getElementById('to_acc_option')
const fromAccOptionList =document.getElementById('acc_option')

 export const ACCOUNT_LIST={}

saveAccountBtn.onclick = save_account_details;
updateAccountBtn.onclick = update_account_details;

async function save_account_details(){
    let account_name = accountName.value || null;
    let account_balance = Number(accountBalance.value) || null;
    let account_type = accountType.value || null;

    if(account_balance ===null || account_name===null || account_type===null){
        showErrorToast("Please fill account details")
        return;
    }
    const formData={account_name,account_balance,account_type}
    const request = new APIRequest('POST',formData,'createNewAccount');
    let response = await request.sendRequest();
   
   if(!response.ok){
       showErrorToast(response.message);
       return
   }

  showSuccessToast("Account Created Successfullly");
   fetch_account_list()
}

async function update_account_details(){
    let account_name = accountName.value || null;
    let account_balance = Number(accountBalance.value) || null;
    let account_type = accountType.value || null;

    if(account_balance ===null || account_name===null || account_type===null){
        showErrorToast("Please fill account details")
        return;
    }
    const formData={account_name,account_balance,account_type}
    const request = new APIRequest('POST',formData,'updateAccBalance');
    let response = await request.sendRequest();
   
   if(!response.ok){
       showErrorToast(response.message);
       return
   }

  showSuccessToast("Account Balance updated Successfullly")
    document.getElementById("add_Account_modal").closeModal()
}

 async function fetch_account_list(){
    const request = new APIRequest('GET',null,'getAccList');
    let response = await request.sendRequest();
    if(!response.ok){
        showErrorToast(response.message);
        return
    }
    let toAccEle="", fromAccEle=""
    ACCOUNT_LIST.accounts= null
    fromAccOptionList.innerHTML=""
    toAccOptionList.innerHTML=""
    ACCOUNT_LIST.accounts= response.result

    ACCOUNT_LIST.accounts.forEach(element => {
        toAccEle += `<option value='${element.acc_name}' data-acc_id='${element.acc_id}'>${element.acc_type}</option>`
      
       
    });
    ACCOUNT_LIST.accounts.forEach(element => {
        fromAccEle += `<option value='${element.acc_name}' data-acc_id='${element.acc_id}'>${element.acc_type}</option>`
      
    });
    fromAccOptionList.insertAdjacentHTML( 'beforeend', toAccEle);
    toAccOptionList.insertAdjacentHTML('beforeend',fromAccEle)
}



fetch_account_list()
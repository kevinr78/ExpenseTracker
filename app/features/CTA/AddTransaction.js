import { showErrorToast,showSuccessToast } from "../../utils/Toast";
import APIRequest from "../../utils/APIRequest";
import { TRANSACTION_HISTORY } from "../TransactionHistory/TransactionHistory";
import { getAndSetData } from "../TransactionHistory/TransactionHistory";

const TRANSACTION_ACCOUNT_FROM=  document.getElementById('transaction_account_from');
const TRANSACTION_ACCOUNT_TO =  document.getElementById('transaction_account_to');
const TRANSACTION_ACCOUNT_TO_CONTAINER =  document.getElementById('transaction_account_to_container');
const TRANSACTION_AMOUNT =  document.getElementById('transaction_amount');
const TRANSACTION_DESCRIPTION =  document.getElementById('transaction_description');
const TRANSACTION_DATE =  document.getElementById('transaction_date');
const TRANSACTION_CATEGORY =  document.getElementById('transaction_tags')
const SAVE_TRANSACTION_BUTTON = document.getElementById('save_transaction');

const transaction_tabs_box=Array.from( document.getElementsByClassName('tab'))
const transaction_tabs = document.getElementById('transaction_tabs_box');


transaction_tabs.addEventListener('click', setActiveTransactionTab);


function setActiveTransactionTab(e){
    let tab = e.target;
    transaction_tabs_box.forEach(element => {
       element.classList.remove('tab-active');
    });
    tab.classList.add('tab-active');

   if(tab.name!=='transfer'){
    TRANSACTION_ACCOUNT_TO_CONTAINER.style.display='none';
   }

   if(tab.name==='transfer'){
    TRANSACTION_ACCOUNT_TO_CONTAINER.style.display='block';
   }

   clearModalValues()
}

function clearModalValues(){
    TRANSACTION_ACCOUNT_FROM.value = '';
    TRANSACTION_ACCOUNT_TO.value = '';
    TRANSACTION_AMOUNT.value = '';
    TRANSACTION_DESCRIPTION.value = '';
    TRANSACTION_DATE.value = '';
    TRANSACTION_CATEGORY.value = '';

}

SAVE_TRANSACTION_BUTTON.onclick =save_transaction_data;

async function save_transaction_data(){
    const transaction_data = {}

    let transaction_type = document.getElementsByClassName('tab-active')[0].textContent;

    if(transaction_type==='Transfer'){
        let transaction_account_to_id = document.querySelector(`#acc_option option[value='${TRANSACTION_ACCOUNT_TO.value.value}']`).dataset.acc_id 
        transaction_data.transaction_account_to_id = Number(transaction_account_to_id);
    }
    let transaction_date = TRANSACTION_DATE.value;
    let transaction_amount = Number(TRANSACTION_AMOUNT.value);
    let transaction_description = TRANSACTION_DESCRIPTION.value;
    let transaction_category = TRANSACTION_CATEGORY.value;
    let transaction_account_from_id = document.querySelector(`#acc_option option[value='${TRANSACTION_ACCOUNT_FROM.value}']`).dataset.acc_id 
   

  
    if(transaction_account_from=='null' ||transaction_date==="" ||transaction_amount===null ||transaction_description===null ||transaction_category===null  ||transaction_type===null  ){
        showErrorToast("Please Fill all fieldls")
        return
    }
    if(transaction_amount<=0 ){
        showErrorToast("Amount should be greater than 0");
        return
    }

    transaction_data.transaction_type=transaction_type
    transaction_data.transaction_date=transaction_date
    transaction_data.transaction_amount=transaction_amount
    transaction_data.transaction_description=transaction_description
    transaction_data.transaction_category=transaction_category
    transaction_data.transaction_account_from_id=Number(transaction_account_from_id)

    const request = new APIRequest('POST',transaction_data,'insertTransaction');
    let response = await request.sendRequest();
   
   if(!response.ok){
       showErrorToast(response.message);
       return
   }
   showSuccessToast("Transaction saved successfully")
   TRANSACTION_HISTORY.data = response.result;
   clearModalValues()
   getAndSetData()
   return;
}
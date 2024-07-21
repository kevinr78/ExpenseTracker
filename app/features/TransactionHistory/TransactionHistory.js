import APIRequest from "../../utils/APIRequest.js";
import { showErrorToast,showSuccessToast } from "../../utils/Toast.js";

const TRANSACTION_HISTORY = {
    data:{}
}

const TABLE_BODY = document.getElementById('table_body');
const FILTER_TRANSACTION_BTN = document.getElementById('filter_transactions');
const CLEAR_TRANSACTION_BTN = document.getElementById('clear_transactions');
const FILTER_TRANSACTION_FORM = document.getElementById('filter_transaction_form');




FILTER_TRANSACTION_BTN.onclick = filter_transactions
async function f_get_user_transaction_history(){
     const request = new APIRequest('POST',null,'getAllTransactions');
     let response = await request.sendRequest();
    
    if(!response.ok){
        showErrorToast(response.message);
        return
    }

    TRANSACTION_HISTORY.data = response.result;
    return;
}

CLEAR_TRANSACTION_BTN.onclick= function(){
    document.getElementById('startDate').value=''
    document.getElementById('endDate').value=''
    document.getElementById('category').selectedIndex=0;
    document.getElementById('type').selectedIndex=0;

    display_tranasction_history()
}

async function filter_transactions(){
    let fromDate,toDate, type, category;
    const formData={} 
    category=document.getElementById('category').value
    type=document.getElementById('type').value
   formData['startDate']=  document.getElementById('startDate').value|| null
   formData['endDate']= document.getElementById('endDate').value || null
   formData['category']= category==='Category'? null : category
   formData['type']=  type==='Type'? null : type
  
    if(formData['startDate']===null && formData['endDate']===null &&
        formData['type']===null && formData['category']===null 
      ){
        showErrorToast("Please select atleast one field");
        return 
      }
   
    const requestObject = new APIRequest('POST',formData,'filterTransaction')
    const getAPIResponse =await requestObject.sendRequest();
    if(!getAPIResponse.ok){
        showErrorToast(getAPIResponse.message)
        return ;
    }
    showSuccessToast(getAPIResponse.message);
    console.log(getAPIResponse.result)

    display_tranasction_history(getAPIResponse.result)
}

function display_tranasction_history(transaction_data=TRANSACTION_HISTORY.data){
   
    let html = '';
    if(transaction_data.length > 0){
        transaction_data.forEach((transaction) => {
            html+=`<tr data-id=${transaction.t_id}>
                  <th>${transaction.description}</th>
                  <td>${transaction.category}</td>
                  <td>${transaction.type==='Income'?'➕':'➖'}</td>
                  <td>${new Date(transaction.date).toLocaleDateString()}</td>
                  <td> Rs. ${transaction.amount}</td>
                </tr>`
        })
    }
    TABLE_BODY.innerHTML=''
    TABLE_BODY.insertAdjacentHTML('afterbegin',html);
        
}

async function getAndSetData(){
 await   f_get_user_transaction_history();
    display_tranasction_history();
}


getAndSetData()
import APIRequest from "../../utils/APIRequest.js";
import { showErrorToast,showSuccessToast } from "../../utils/Toast.js";


export const TRANSACTION_HISTORY = {
    data:{}
}

const TABLE_BODY = document.getElementById('table_body');
const FILTER_TRANSACTION_FORM = document.getElementById('filter_transaction_form');



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


export function display_tranasction_history(transaction_data=TRANSACTION_HISTORY.data){
   
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

export async function getAndSetData(){
 await   f_get_user_transaction_history();
    display_tranasction_history();
}


getAndSetData()
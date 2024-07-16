import APIRequest from "../../utils/APIRequest.js";
import { showErrorToast } from "../../utils/Toast.js";

const TRANSACTION_HISTORY = {
    data:{}
}

const TABLE_BODY = document.getElementById('table_body');

async function f_get_user_transaction_history(){
     const request = new APIRequest('POST',null,'getAllTransactions');
    let response = await request.sendRequest();
    
    console.log(response);
    if(!response.ok){
        showErrorToast(response.message);
        return
    }

    TRANSACTION_HISTORY.data = response.result;
    return;
}



function display_tranasction_history(){
    let html = '';
    if(TRANSACTION_HISTORY.data.length > 0){
        TRANSACTION_HISTORY.data.forEach((transaction) => {
            html+=`<tr data-id=${transaction.t_id}>
                  <th>${transaction.description}</th>
                  <td>${transaction.category}</td>
                  <td>${transaction.type==='Income'?'➕':'➖'}</td>
                  <td>${new Date(transaction.date).toLocaleDateString()}</td>
                  <td> Rs. ${transaction.amount}</td>
                </tr>`
        })
    }

    TABLE_BODY.insertAdjacentHTML('afterbegin',html);
        
}

async function getAndSetData(){
 await    f_get_user_transaction_history();
    display_tranasction_history();
}


getAndSetData()
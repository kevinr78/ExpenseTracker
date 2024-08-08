import APIRequest from "../../utils/APIRequest.js";
import { showErrorToast,showSuccessToast } from "../../utils/Toast.js";
import { display_tranasction_history } from "./TransactionHistory.js";

const FILTER_TRANSACTION_BTN = document.getElementById('filter_transactions');
const CLEAR_TRANSACTION_BTN = document.getElementById('clear_transactions');



FILTER_TRANSACTION_BTN.onclick = filter_transactions

CLEAR_TRANSACTION_BTN.onclick= clear_filter_parameters


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
   console.log(formData)
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



function clear_filter_parameters(){
    document.getElementById('startDate').value=''
    document.getElementById('endDate').value=''
    document.getElementById('category').selectedIndex=0;
    document.getElementById('type').selectedIndex=0;

    display_tranasction_history()
}

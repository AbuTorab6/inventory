import axios from 'axios';
import cogoToast from 'cogo-toast';

import store from '../redux/storage/store'
import { showLoader,hideLoader } from '../redux/stateSlice/loaderState';


var baseURL = "http://localhost:5000"


var axiosHeader = {
    headers:{
        "authorization":localStorage.getItem('token')
    } 
}


var purchaseList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    return axios.get(baseURL+'/purchaseList/'+pageNo+'/'+perPage+'/'+searchKey,axiosHeader).then
    (
        (res)=>
        {
            if(res.status===200)
            {
                if(res.data[0].allData.length==0)
                {
                    cogoToast.warn("No data found");
                    return false;
                }
                else
                {
                    return res.data;
                }
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("something is wrong.Can not display the purchase list.");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )
}


export {purchaseList};
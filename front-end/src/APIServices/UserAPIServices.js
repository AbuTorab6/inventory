import axios from 'axios';
import cogoToast from 'cogo-toast';

import store from '../redux/storage/store'
import { showLoader,hideLoader } from '../redux/stateSlice/loaderState';


var baseURL = "http://localhost:5000"



var userRegistration = (firstName,lastName,email,mobile,password,photo)=>
{

    store.dispatch(showLoader())

    var data = {
        firstName:firstName,
        lastName: lastName,
        email:email,
        mobile:mobile,
        password:password,
        photo:photo
    }

    return axios.post(baseURL+'/registration',data).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return true;
            }
            else if (res.status===206)
            {
                cogoToast.error(res.data);
                return false;
            }
            else if(res.status===203)
            {
                cogoToast.error(res.data);
                return false;
            }
            else
            {
                cogoToast.error("your registration is not successfull");
                return false;
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


var userLogin = (email,password)=>
{
    store.dispatch(showLoader())
    var data = {
        email:email,
        password:password
    }

    return axios.post(baseURL+'/login',data).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data
            }
            else if(res.status===203)
            {
                cogoToast.error(res.data);
                return false
            }
            else
            {
                cogoToast.error("log in failed");
                return false;
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



var axiosHeader = {
    headers:{
        "authorization":localStorage.getItem('token')
    } 
}



var userProfileDetail = ()=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/profileDetail',axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data;
            }
            else if (res.status===206)
            {
                cogoToast.error(res.data);
                return false;
            }
            else if(res.status===203)
            {
                cogoToast.error(res.data);
                return false;
            }
            else
            {
                cogoToast.error("can not getting your profile detail");
                return false;
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


var updateUserProfile = (firstName,lastName,mobile,password,photo)=>
{
    store.dispatch(showLoader())
    var data = {
        firstName:firstName,
        lastName: lastName,
        mobile:mobile,
        password:password,
        photo:photo
    }

    return axios.post(baseURL+'/updateUser',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return true
            }
            else if(res.status===206)
            {
                cogoToast.error(res.data);
                return false;
            }
            else if(res.status===203)
            {
                cogoToast.error(res.data);
                return false;
            }
            else
            {
                cogoToast.error("you can not update ypur profile");
                return false;
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




export {userRegistration,userLogin,userProfileDetail,updateUserProfile}
import React,{Fragment} from 'react';

import {Routes,Route,BrowserRouter} from 'react-router-dom'

import DashboardPage from '../pages/dashboard/DashboardPage';
import RegistrationPage from '../pages/registration/RegistrationPage';
import LoginPage from '../pages/login/LoginPage';

import ProfilePage from '../pages/profile/ProfilePage';

const MyRouter = () => 
{

    if(localStorage.getItem('token'))
    {
        return (
            <Fragment>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<DashboardPage/>}/>
                            
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/registration' element={<RegistrationPage/>}/>
                            <Route path='/profile' element={<ProfilePage/>}/>
                        </Routes>
                    </BrowserRouter>
            </Fragment>
        );
    }
    else
    {
        return (
            <Fragment>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<LoginPage/>}/>
                            
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/registration' element={<RegistrationPage/>}/>
                            <Route path='*' element={<LoginPage/>}/>
                        </Routes>
                    </BrowserRouter>
            </Fragment>
        );
    }

    
};

export default MyRouter;
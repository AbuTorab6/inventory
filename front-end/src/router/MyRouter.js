import React,{Fragment} from 'react';

import {Routes,Route,BrowserRouter} from 'react-router-dom'

import DashboardPage from '../pages/dashboard/DashboardPage';
import RegistrationPage from '../pages/registration/RegistrationPage';
import LoginPage from '../pages/login/LoginPage';

import ProfilePage from '../pages/profile/ProfilePage';
import BrandListPage from '../pages/brand/BrandListPage';
import CategoryListPage from '../pages/category/CategoryListPage';
import SupplierListPage from '../pages/supplier/SupplierListPage';
import CustomerListPage from '../pages/customer/CustomerListPage';
import ExpenseTypeListPage from '../pages/expenseType/ExpenseTypeListPage';

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
                            <Route path='/brandList' element={<BrandListPage/>}/>
                            <Route path='/categoryList' element={<CategoryListPage/>}/>
                            <Route path='/supplierList' element={<SupplierListPage/>}/>
                            <Route path='/customerList' element={<CustomerListPage/>}/>
                            <Route path='/expenseTypeList' element={<ExpenseTypeListPage/>}/>
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
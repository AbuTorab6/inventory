import React,{Fragment,useEffect,useState} from 'react';


import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from "react-icons/ai";



import { brandList } from '../../APIServices/BrandAPIServices';
import { setTotalFunc,setAllBrandFunc } from '../../redux/stateSlice/brandState';
import { Link } from 'react-router-dom';

import {useDispatch,useSelector} from 'react-redux';

import ReactPaginate from 'react-paginate';

const BrandList = () => 
{

    var dispatch = useDispatch();

    const[searchKey,setSearchKey]=useState(0)
    const[perPage,setPerPage]=useState(5);



    useEffect(()=>{

        brandList(1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllBrandFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )

    },[])

    //for pagination
    const handlePageClick = (p1) => // here the parameter "p1" will receive 2.so p1=2
    {
        brandList(p1.selected+1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllBrandFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    };


    //for dropdown 
    var productPerPage = (p1)=>
    {
        var value = p1.target.value;
        var intValue = parseInt(value)

        setPerPage(intValue)
        brandList(1,intValue,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllBrandFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )
    }


    //for search
    var searchOnChange = (p1)=>
    {
        var value = p1.target.value;
        setSearchKey(value);


        if(value.length===0)
        {
            setSearchKey(0);
            brandList(1,perPage,0).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllBrandFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
        else
        {
            brandList(1,perPage,value).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllBrandFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
    }





    let total = useSelector((state)=>state.brandState.total);

    var allBrand = useSelector((state)=>state.brandState.allBrand);
    if(allBrand.length===0)
    {
        var allBrandArr = <h1>No data found</h1>
    }
    else
    {
        var allBrandArr = allBrand.map(
            function(p1,p2)
            {
                return(
                    <tr>
                        <td> {p2} </td>
                        <td>{p1.name}</td>
                        <td>{p1.createdDate}</td>
                        <td>
                        <button  className='table-edit-btn me-2'><Link className='table-edit-btn-link' to={'/brandCreateUpdate/'+p1._id} ><span ><AiOutlineEdit/></span></Link></button>  
                        </td>
                    </tr>
                )
            }
        )
    }
    


    return (
        <Fragment>
            <section className='brand-list-section'>
                <div className='table-content'>

                    <div className='table-grid'>
                        <h4>Brand List</h4>
                        <div>
                            <select onChange={productPerPage}>
                                <option value="5">5 per page</option>
                                <option value="10">10 Per page</option>
                                <option value="15">15 per page</option>
                                <option value="20">20 per page</option>
                            </select>
                        </div>
                        <div className='search'>
                            <input onChange={searchOnChange} type="text" placeholder='search your brand here . . ' />
                        </div>
                    </div>

                    <div className='my-table'>
                        <Table  hover >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Brand Name</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBrandArr}
                            </tbody>
                        </Table>
                    </div>

                    <nav>
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={total/perPage} 
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick} // if i click "3rd" page from pagination. it will pass 2(3rd-1) to "handlePageClick" function.
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>

                </div>
            </section>
        </Fragment>
    );
};

export default BrandList;
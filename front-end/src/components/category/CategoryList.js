import React,{Fragment,useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from "react-icons/ai";

import { categoryList } from '../../APIServices/CategoryAPIServices';
import { setAllCategoryFunc,setTotalFunc } from '../../redux/stateSlice/categoryState';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

const CategoryList = () => 
{

    var dispatch = useDispatch();

    const[searchKey,setSearchKey]=useState(0)
    const[perPage,setPerPage]=useState(5);

    useEffect(()=>{

        categoryList(1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllCategoryFunc(res[0].allData));
                    dispatch(setTotalFunc(res[0].totalData[0].total))
                }
            }
        )

    },[])



    //for pagination
    const handlePageClick = (p1) => // here the parameter "p1" will receive 2.so p1=2
    {
        categoryList(p1.selected+1,perPage,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {

                    dispatch(setAllCategoryFunc(res[0].allData));
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
        categoryList(1,intValue,searchKey).then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setAllCategoryFunc(res[0].allData));
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
            categoryList(1,perPage,0).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllCategoryFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
        else
        {
            categoryList(1,perPage,value).then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllCategoryFunc(res[0].allData));
                        dispatch(setTotalFunc(res[0].totalData[0].total))
                    }
                }
            )
        }
    }


    let total = useSelector((state)=>state.categoryState.total);

    var allCategory = useSelector((state)=>state.categoryState.allCategory);
    if(allCategory.length===0)
    {
        var allCategoryArr = <h1>No data found</h1>
    }
    else
    {
        var allCategoryArr = allCategory.map(
            function(p1,p2)
            {
                return(
                    <tr>
                        <td> {p2} </td>
                        <td>{p1.name}</td>
                        <td>{p1.createdDate}</td>
                        <td> 
                        <button  className='table-edit-btn me-2'><Link className='table-edit-btn-link' to={'/categoryCreateUpdate/'+p1._id} ><span ><AiOutlineEdit/></span></Link></button>  
                        </td>
                    </tr>
                )
            }
        )
    }




    return (
        <Fragment>
            <section className='category-list-section'>
                <div className='table-content'>

                    <div className='table-grid'>
                        <h4>Category List</h4>
                        <div>
                            <select onChange={productPerPage}>
                                <option value="5">5 per page</option>
                                <option value="10">10 Per page</option>
                                <option value="15">15 per page</option>
                                <option value="20">20 per page</option>
                            </select>
                        </div>
                        <div className='search'>
                            <input onChange={searchOnChange} type="text" placeholder='search your category here . . ' />
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
                                {allCategoryArr}
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

export default CategoryList;
import {createSlice} from '@reduxjs/toolkit';

var returnState = createSlice(
    {
        name:"returnState",
        initialState:{
            total:0,
            allReturn:[],
            returnReportTotal:0,
            returnReportData:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllReturnFunc:(p1,data)=>
            {
                p1.allReturn=data.payload
            },
            setReturnReportTotal:(p1,data)=>
            {
                p1.returnReportTotal=data.payload
            },
            setReturnReportData:(p1,data)=>
            {
                p1.returnReportData=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllReturnFunc,setReturnReportTotal,setReturnReportData} = returnState.actions;
export default returnState.reducer;
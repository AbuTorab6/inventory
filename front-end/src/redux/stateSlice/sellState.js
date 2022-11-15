import {createSlice} from '@reduxjs/toolkit';

var sellState = createSlice(
    {
        name:"sellState",
        initialState:{
            total:0,
            allSell:[],
            sellReportTotal:0,
            sellReportData:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllSellFunc:(p1,data)=>
            {
                p1.allSell=data.payload
            },
            setSellReportTotal:(p1,data)=>
            {
                p1.sellReportTotal=data.payload
            },
            setSellReportData:(p1,data)=>
            {
                p1.sellReportData=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllSellFunc,setSellReportTotal,setSellReportData} = sellState.actions;
export default sellState.reducer;
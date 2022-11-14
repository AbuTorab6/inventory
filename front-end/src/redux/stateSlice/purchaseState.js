import {createSlice} from '@reduxjs/toolkit';

var purchaseState = createSlice(
    {
        name:"purchaseState",
        initialState:{
            total:0,
            allPurchase:[],
            purchaseReportTotal:0,
            purchaseReportData:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllPurchaseFunc:(p1,data)=>
            {
                p1.allPurchase=data.payload
            },
            setPurchaseReportTotal:(p1,data)=>
            {
                p1.purchaseReportTotal=data.payload
            },
            setPurchaseReportData:(p1,data)=>
            {
                p1.purchaseReportData=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllPurchaseFunc,setPurchaseReportTotal,setPurchaseReportData} = purchaseState.actions;
export default purchaseState.reducer;
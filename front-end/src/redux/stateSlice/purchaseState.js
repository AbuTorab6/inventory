import {createSlice} from '@reduxjs/toolkit';

var purchaseState = createSlice(
    {
        name:"purchaseState",
        initialState:{
            total:0,
            allPurchase:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllPurchaseFunc:(p1,data)=>
            {
                p1.allPurchase=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllPurchaseFunc} = purchaseState.actions;
export default purchaseState.reducer;
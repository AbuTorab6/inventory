import {createSlice} from '@reduxjs/toolkit';

var sellState = createSlice(
    {
        name:"sellState",
        initialState:{
            total:0,
            allSell:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllSellFunc:(p1,data)=>
            {
                p1.allSell=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllSellFunc} = sellState.actions;
export default sellState.reducer;
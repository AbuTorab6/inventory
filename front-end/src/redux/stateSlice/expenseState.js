import {createSlice} from '@reduxjs/toolkit';

var expenseState = createSlice(
    {
        name:"expenseState",
        initialState:{
            total:0,
            allExpense:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllExpenseFunc:(p1,data)=>
            {
                p1.allExpense=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllExpenseFunc} = expenseState.actions;
export default expenseState.reducer;
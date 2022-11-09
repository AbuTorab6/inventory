import {createSlice} from '@reduxjs/toolkit';

var expenseState = createSlice(
    {
        name:"expenseState",
        initialState:{
            total:0,
            allExpense:[],
            allExpenseType:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllExpenseFunc:(p1,data)=>
            {
                p1.allExpense=data.payload
            },
            setAllExpenseTypeFunc:(p1,data)=>
            {
                p1.allExpenseType=data.payload;
            }
        }
    }
)

export const {setTotalFunc,setAllExpenseFunc,setAllExpenseTypeFunc} = expenseState.actions;
export default expenseState.reducer;
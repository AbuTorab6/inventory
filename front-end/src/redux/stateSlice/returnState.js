import {createSlice} from '@reduxjs/toolkit';

var returnState = createSlice(
    {
        name:"returnState",
        initialState:{
            total:0,
            allReturn:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllReturnFunc:(p1,data)=>
            {
                p1.allReturn=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllReturnFunc} = returnState.actions;
export default returnState.reducer;
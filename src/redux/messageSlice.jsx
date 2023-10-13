import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 export let getmessages = createAsyncThunk("message/getmessages", async function () {
   const { data } = await axios.get(
     "https://sara7aiti.onrender.com/api/v1/message",
     {
       headers: {
         token: localStorage.getItem("userToken"),
       },
     }
   );
   
   return data;
 });


let messageSlice=createSlice({
name:"message",
initialState:{messages:[]},
reducers:{},
extraReducers:( builder)=>{
    builder.addCase(getmessages.fulfilled,(state,action)=>{
        state.messages=action.payload
    })
}
})

 export let messageReducer =messageSlice.reducer;
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

export const postMessage = createAsyncThunk(
  "messages/postMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/message",
        
          messageData,
        
      );
      
      return response.data;
    } catch (error) {
      // console.log("error",error)
      return rejectWithValue(error);
    }
  }
);



let messageSlice = createSlice({
  name: "message",
  initialState: { messages: [], loading:false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getmessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(postMessage.fulfilled, (state, action) => {
      state.loading = false;
      console.log("msg suss", action.payload);
    });
  },
});

 export let messageReducer =messageSlice.reducer;
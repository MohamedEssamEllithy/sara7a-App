import React, { useEffect, useState } from 'react'
import style from './sendmessage.module.css'
import jwtDecode from 'jwt-decode';
import avaterImg from "../../images/avatar.png";
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Sendmessage() {
  let [userName, setuserName] = useState("");
  let recievedID = useParams()
  let[isloading,setisloading]=useState(false)


  async function addmessage( values){
    try {
      setisloading(true);
      let data = {
        ...values,
        receivedId: recievedID.id,
      };

      let res = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/message",
        data
      );
      console.log(res);
      if (res.data.messaged == "Added"){
        setisloading(false);

      } 

    } catch (error) {
      console.log(error)
    }
    

  }


let formik = useFormik({
  initialValues: {
    messageContent:"",
  },
  onSubmit:(values)=>{
    
 addmessage(values)

  }
});




// function getuserName() {
//   let decoded = jwtDecode(localStorage.getItem("userToken"));
//   setuserName(decoded.name);
// }

useEffect(()=>{
  // getuserName()
  
})

  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <img src={avaterImg} className="avatar " alt />

        <h3 className="py-2">{userName}</h3>
        <div className="container w-50 m-auto">
          <form onSubmit={formik.handleSubmit}>
            <textarea
              className="form-control"
              name="messageContent"
              value={formik.values.messageContent}
              onChange={formik.handleChange}
              id
              cols={10}
              rows={9}
              placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
            />
            <button className="btn btn-outline-info mt-3" type="submit">
              {isloading ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                <>
                  <i className="far fa-paper-plane" /> Send
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

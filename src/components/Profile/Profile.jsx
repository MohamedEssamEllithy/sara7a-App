import React, { useEffect, useState } from 'react'
import style from './Profile.module.css'
import avaterImg from '../../images/avatar.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQuery, useQueryClient } from "react-query";


export default function Profile() {

 
  // const[allmessages ,setAllmessages]=useState([])
let[userName,setuserName]=useState("")
let [userId ,setuserId]=useState("")
const [show, setShow] = useState(false);
const [url] = useState("http://localhost:3000");
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const {
  data: messages,
  isError,
  isLoading,
} = useQuery("messages", fetchMessages);

  async function fetchMessages() {
    const response = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    console.log(response.data.allMessages);
    return response.data.allMessages;
  }


// another method without use react-query 

// async function getmessages(){
//   let { data } = await axios.get(
//     `https://sara7aiti.onrender.com/api/v1/message`,{
//       headers:{
//         token: localStorage.getItem("userToken")
//       }
//     }
//   );
//   setAllmessages(data.allMessages);
//   console.log(allmessages)}

function getuserId(){
  let decoded = jwtDecode(localStorage.getItem("userToken"));
  console.log(decoded)
  setuserId(decoded.id)
  setuserName(decoded.name)
}


useEffect(()=>{
// getmessages()
getuserId()
},[])


  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card pt-5">
            <img src={avaterImg} className="avatar " alt />

            <h3 className="py-2">{userName}</h3>
            <Link
              data-toggle="modal"
              data-target="#share"
              className="btn btn-default-outline share "
              onClick={handleShow}
            >
              <i className="fas fa-share-alt" /> Share Profile
            </Link>
          </div>
        </div>

        {/* =================messages=================== */}
        <div className="container text-center my-5 text-center">
          <div className="row">
            {isLoading ? (
              <div className="col-md-12">
                <div className="card py-5">
                  <p>Loading...</p>
                </div>
              </div>
            ) : isError ? (
              <div className="col-md-12">
                <div className="card py-5">
                  <p>Error fetching messages</p>
                </div>
              </div>
            ) : messages.length == 0 ? (
              <>
                <div className="col-md-12">
                  <div className="card py-5">
                    <p>You don't have any messages... </p>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {messages?.map((ele) => (
              <div key={ele._id} className="col-md-12">
                <div className="card py-3 mb-3">
                  <p>{ele.messageContent} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*-------------model ----------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to={"/message/" + userId}>{url + "/message/" + userId}</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

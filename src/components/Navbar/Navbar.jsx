import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { TokenContext } from "../Context/Context";
import logo from '../../images/logo300.png'

export default function Navbar() {

const nav = useNavigate()
  let{Token,setToken} =useContext(TokenContext)

function logOut(){
  localStorage.removeItem("userToken")
  setToken(null)
 
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-light ">
        <div className="container ">
          <Link className="nav-link active" to={""}>
            <img  className={`${style.logo} m-2`}  src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {Token ? (
            <>
              <div
                className="collapse navbar-collapse justify-content-end "
                id="navbarNavAltMarkup"
              >
                <Link className="nav-link active me-4" to={"profile"}>
                  profile
                </Link>
                <Link className="nav-link active me-4" onClick={logOut}>
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                className="collapse navbar-collapse justify-content-end "
                id="navbarNavAltMarkup"
              >
                <Link className="nav-link active me-4" to={"signup"}>
                  Sign Up
                </Link>
                <Link className="nav-link active me-4" to={"login"}>
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

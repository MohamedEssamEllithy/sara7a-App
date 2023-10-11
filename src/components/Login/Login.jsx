import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import * as Yup from "yup";
import { useFormik } from "formik"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../Context/Context';

export default function Login() {
   let {setToken}=useContext(TokenContext)
   let navigate = useNavigate();
   const [isLoading, setisLoading] = useState(false);
   const [ApiError, setApiError] = useState("");

    async function login(values) {
      try {
        setisLoading(true);
        console.log(values)
        let res = await axios.post(
          `https://sara7aiti.onrender.com/api/v1/user/signin`,
          values
        );
        if (res.data.message === "welcome") {
          setisLoading(false);
          localStorage.setItem("userToken",res.data.token)
          setToken(res.data.token)
          navigate("/profile");
          console.log(res.data);
        }
      } catch (error) {
        console.log("error", error.response.data.error);
        setApiError(error.response.data.error);
        setisLoading(false);
      }
    }

    const validationSchema = Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,8}$/,
          "password should start with capital letter "
        )
        .required("password is required"),
     
     
    });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      try {
        login(values);
      } catch (error) {
        console.log("error", error);
      }
    },
  });
  return (
    <div className="w-50 mx-auto my-5">
      <h3 className="text-center">LogIn</h3>
      {ApiError ? <div className="alert alert-danger">{ApiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
       

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger"> {formik.errors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger"> {formik.errors.password}</div>
          ) : (
            ""
          )}
        </div>
       
        <button type='submit' className="btn btn-outline-dark rounded-5 d-block mx-auto ">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            <>
              {" "}
              <i className="fa-regular fa-pen-to-square"></i> Login
            </>
          )}
        </button>
      </form>
    </div>
  );
}

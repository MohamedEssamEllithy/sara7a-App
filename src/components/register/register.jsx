import React, { forwardRef, useContext, useState } from 'react'
import style from './register.module.css'
import {useFormik} from 'formik' 
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



export default function Register() {
  let navigate = useNavigate()
  const [isLoading,setisLoading]=useState(false)
  const [ApiError,setApiError]=useState("")

  async function signup(values){
  try {
    setisLoading(true)
    let res = await axios.post(`https://sara7aiti.onrender.com/api/v1/user`,values)
    if (res.data.message === "Added") {
      setisLoading(false);
      navigate('/login')
      console.log(res.data);
    }
  } catch (error) {
    console.log("error",error.response.data.error)
    setApiError(error.response.data.error);
    setisLoading(false);
  }
}



  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "name must be Less than 15 char")
      .min(3, "name must be more than 3")
      .required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "password should start with capital letter "
      )
      .required("password is required"),
    rePassword: Yup.string()
     .oneOf([Yup.ref("password")])
    .required("password is required"),
    age: Yup.number().min(10,"min is 10").max(60,"max is 60").positive("age must be positive num").required("age is required"),
  });

  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      age:0
    },
    validationSchema:validationSchema,

    onSubmit:(values)=>{
      try {
        signup(values);
      } catch (error) {
        console.log("error",error)
      }
      
      console.log(values)
    }
  })

  return (
    <div className="w-50 mx-auto my-5">
      <h3 className="text-center">Sign up</h3>
      {ApiError ? <div className="alert alert-danger">{ApiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="userName">userName</label>
          <input
            type="text"
            id="userName"
            className="form-control"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger"> {formik.errors.name}</div>
          ) : (
            ""
          )}
        </div>

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
        <div className="form-group mb-3">
          <label htmlFor="repassword">Repassword</label>
          <input
            type="text"
            id="repassword"
            className="form-control"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">
              {" "}
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            className="form-control"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          {formik.errors.age && formik.touched.age ? (
            <div className="alert alert-danger"> {formik.errors.age}</div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Link className="nav-link active mx-auto " to={"/login"}>
            <p className="text-primary">
              {" "}
              You are Already Sign up{" "}
              <i className="fa-regular fa-pen-to-square"></i>
            </p>
          </Link>
          <button className="btn btn-outline-dark rounded-5   ">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              <>
                <i className="fa-regular fa-pen-to-square"></i> Sign Up
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 

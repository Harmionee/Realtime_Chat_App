import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo8.png" ;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from "../util/APIRoutes";

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastLayout = {
        autoClose: 7000,
        position: "top-right",
        theme: "light",
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/");
    }
  }, []);

  const handleValidation = ()=>{
    const{password,confirmPassword,username,email} = values;
    if(password !== confirmPassword ){
      toast.error("password and confirm password should be same.",toastLayout
      ); 
      return false;
    } else if(username.length<3){
      toast.error("Username should be greater than 3 characters", toastLayout);
      return false;
    } else if (password.length<8){
      toast.error("Password cannot be less than 8 characters", toastLayout);
      return false;
    } else if (email===""){
      toast.error("email is required",toastLayout);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (handleValidation()){
        console.log("in validation",registerRoute)
      const{password,confirmPassword,username,email} = values;
        const {data} = await axios.post(registerRoute,{
          username,email,password,
        });
        if (data.status===false){
          toast.error(data.msg, toastLayout);
        }
        if (data.status === true ){
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          navigate("/");
        }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      
    }
  }, []);
  const handleChange = (event) =>{
    setValues({...values,[event.target.name]: event.target.value});
  };
  return (
   <>
    <FormContainer>
      <form onSubmit = {(event)=>handleSubmit(event)}>
        <div className = "brand">
          <img src={Logo} alt="logo"/>
          <h1>Stream</h1>
        </div>
        <input
        type="text"
        placeholder = "Username"
        name = "username"
        onChange = {(e) => handleChange(e)}
        />
        <input
        type="email"
        placeholder = "Email"
        name = "email"
        onChange = {(e) => handleChange(e)}
        />
        <input
        type="password"
        placeholder = "Password"
        name = "password"
        onChange = {(e) => handleChange(e)}
        />
        <input
        type="password"
        placeholder = "Confirm Password"
        name = "confirmPassword"
        onChange = {(e) => handleChange(e)}
        />
        <button type = "submit">Create User</button>
        <span>
            Already have an account ? <Link to="/login">Login.</Link>
        </span>
      </form>
      <div className='terms'>
          By continuing, you’re agreeing to our Customer Terms of Service, User Terms of Service, Privacy Policy, and Cookie Policy.
      </div>
    </FormContainer>
    <ToastContainer/>
   </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .terms{
    color: white;
    font-size:8px;
    text-transform: uppercase;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
form{
  display: flex;
  flex-direction: column;
  background-color: #00000076;
  gap: 2rem;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    padding: 1rem;
    background-color: transparent;
    border-radius= 0.4rem;
    border:0.1rem solid #0066cc;
    color:white;
    width: 100%;
    font-size: 1rem;
    &:focus{
      border: 0.1rem solid #ccffff;
      outline:none;
    }
  }
  button{
    background-color: #008080;
    color: white;
    padding: 1rem 2rem;
    border: none;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #4e0eff;
    }
  }
  span {color: white; 
        text-transform: uppercase;
        a{
          color: #0066cc;
          text-decoration: none;
          font-weight: bold;
        }
  }
}
`;

export default Register
import "./login.css"
import { useState,useEffect, useContext } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import {setLoader,setUser} from "../../store/slices/auth"
import Loader from "../loader/Loader";




export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loader} = useSelector((state) => state.auth);


    const [emptyFields,setEmptyFields] = useState(false);
    const [authData,setAuthData] = useState({
        email : '',
        password : ''
    });


    function submitHandler() {
        
        Object.values(authData).forEach((key) => {
            //console.log(key,formData[key]);
            if(key === "") {
                setEmptyFields(true);
                return;
            }
        })


        dataAuth();
    }

    async function dataAuth() {
       
        dispatch(setLoader(true));
        const data = await fetch('http://13.232.64.29:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
        });

        const validData = await data.json();
        console.log(validData)
        if(validData.success) {
            
            localStorage.setItem("user123", JSON.stringify(validData.user));
            dispatch(setUser(validData.user))

           // setToken(validData.token);
            //setUser(validData.user);
            
            dispatch(setLoader(false));
            toast.success('Logged In Successfully')
           // setLoader(false);
            setTimeout(() => {
                navigate('/myAccount')
                
            }, 1000);

            return

        }
      //  
        dispatch(setLoader(false));

        toast.error('Wrong Credentials')



       


    }


    function formHandler(e) {
        setEmptyFields(false)
        const { name, value } = e.target;
        setAuthData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    if(loader) return  <Loader></Loader>

    

    return (
        <div className="loginWrapper">
          
        
          <div className="LoginMainDiv">
          {
                emptyFields ? 
                <div className="errorClassLogin">
                    <MdError style={{marginRight : '10px',marginTop : '2px'}}></MdError>
                    <p>Please Fill All the Details</p>
                    

                </div>

                :
                ''
            }
            <h1 id="loginDlg">Log In</h1>
            <input id="em" type="email" name="email" onChange={formHandler} placeholder="Email" />
            <input id="em" type="password" name= "password" onChange={formHandler} placeholder="Password" />
             
            <button id="login" onClick={submitHandler}>Log In</button>

          </div>
        </div>
    );
}

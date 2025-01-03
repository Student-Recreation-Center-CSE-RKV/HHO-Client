import React, { useState, useContext } from 'react'
import "./LoginSection.css"
import { AppContext } from '../../context/Context';
import { useNavigate, Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

import Button from '@mui/material/Button';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// import TopRightAlert from '../../../components/Alert';
function LoginPage() {
  const {apiUrl} = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState();
  const { token, setToken, open, setOpen, alertMsg, setAlertMsg,setErrorOcc } = useContext(AppContext);


  // Function to show the Snackbar (when login is successful)
  // const handleLoginSuccess = () => {
  //   setOpen(true); // Open the Snackbar
  // };

  // Function to close the Snackbar




  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMsg("Credentials Required...");
      setErrorOcc(true);
      setOpen(true);
    } else {
      try {
        const response = await axios.post(`${apiUrl}/api/users/offusers/login`, {
          email,
          password,
        });
        
        // Check for success status in the response data
        if (response.data.success) {
          console.log(response.data);
          setAlertMsg("Login Successful..");
          setErrorOcc(false);
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token); // Set the token directly from response
          setOpen(true);
          navigate("/");
        } else {
          setAlertMsg(response.data.message || "Login failed.");
          setErrorOcc(true);
          setOpen(true);
        }
      } catch (error) {
        // Handle errors here if the request fails
        const errorMsg = error.response?.data?.message || "Login failed due to a server error.";
        setAlertMsg(errorMsg);
        setErrorOcc(true);
        setOpen(true);
        console.error('Error logging in:', error);
      }
    }
  };
  

  return (

    <div className='back-image login'>
      <img className="image" src="https://res.cloudinary.com/dnbeeynnu/image/upload/v1726826896/HHO/navbar/hho_logo_s548ea.png" alt='..' />
      <form action='' className='login-form'>
        <h1 className='login-title'>Welcome to HHO</h1>
        <div className='login-content'>
          <div className='login-box'>
            <i className='ri-user-3-line login-icon'></i>
            <div className='login-box-input'>
              <input className='input login-input' type='email' value={email} required placeholder='' onChange={(e) => setEmail(e.target.value)} />
              <label className='login-label' htmlFor=''>Email</label>
            </div>
          </div>
          <div className='login-box'>
            <i className='ri-lock-2-line login-icon'></i>
            <div className='login-box-input'>
              <input className='input login-input' type={showPassword ? 'text' : 'password'} required placeholder='' id="login-pass" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className='login-label' htmlFor=''>Password</label>
              <i className={showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} id='login-eye' onClick={togglePasswordVisibility}></i>
            </div>
          </div>
          {/* <a href='#' className='login-forgot'>forget password?</a> */}
          <button className='login-btn' onClick={handleSubmit} >Login</button>
        </div>
      </form>
    </div>

  )
}

export default LoginPage

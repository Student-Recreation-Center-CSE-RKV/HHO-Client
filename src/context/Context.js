import React, { createContext, useState,useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from 'axios';
export const AppContext = createContext();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const AppProvider = ({ children }) => {

  const apiUrl = "http://localhost:8000";
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const[open,setOpen] = useState();
  const[severity,setSeverity] = useState("");
  const[user,setUser] = useState({});
  const[alertMsg,setAlertMsg] = useState("");
  const[errorOcc,setErrorOcc] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const[totalBalance,setTotalBalance] = useState(0);
  const[donatedAmt,setDonatedAmt] = useState(0);

  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  

  const [userData, setUserData] = useState({});
  const[role,setRole] = useState(localStorage.getItem('role') || null);
  console.log(role);

  const [allEvents, setAllEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );


  useEffect(() => {
    async function getEvents() {
      try {
        const response = await axios.get(`${apiUrl}/api/events`);
        const data = response.data;
        setAllEvents(data);
        console.log(data);
        localStorage.setItem('events', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getEvents();
  }, []);

  //getuserData 
  useEffect(()=>{
    async function getUserData(){
      if(token){
        try {
          const response = await axios.get(`${apiUrl}/api/users/offusers/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
      
          const data = response.data.data;
          setUserData(data);
          console.log(data);
          
          localStorage.setItem('role',data.role);
          setRole(data.role);
          // return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
    }
    getUserData()
  },[token])

  useEffect(() => {
    const getMoney = async()=>{
        try {
          const response = await axios.get(`${apiUrl}/get-money`);
          const data = response.data;
          console.log("amount: ",data.money[0].amount);
          // localStorage.setItem('totalBalance', data.money[0].amount);
          setTotalBalance(data.money[0].amount);
          setDonatedAmt(data.money[0].donated_amount)
          console.log("Donated: ",data.money[0].donated_amount);
        } catch (error) {
          console.log(error.message);
        }
    }
    getMoney();
  }, [totalBalance]);



  // Function to close the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); // Close the Snackbar
  };
  return (
    <AppContext.Provider value={{donatedAmt,setDonatedAmt,token,setToken,user,setUser,open,setOpen,handleClose,alertMsg,setAlertMsg,userData,setUserData,role,setRole,transactions , setTransactions,filteredTransactions, setFilteredTransactions,severity,setSeverity,errorOcc,setErrorOcc,allEvents,setAllEvents,totalBalance,setTotalBalance,apiUrl}}>
      {children}
    </AppContext.Provider>
  );
};
import * as React from 'react';
import axios from 'axios';
import { Box, Button, TextField, MenuItem, Typography, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppContext } from '../../../context/Context';
import {
  CreditScore,
  VolunteerActivism,
  Handshake,
  MoneyOff
} from '@mui/icons-material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Orange color
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#FFFFFF', // White text
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
});

const transactionTypes = [
  { value: 'credit', label: 'Credit', icon: <CreditScore sx={{ color: '#FF5722' }} /> },
  { value: 'debit', label: 'Debit', icon: <MoneyOff sx={{ color: '#FF5722' }} /> },
  { value: 'donation', label: 'Donation', icon: <VolunteerActivism sx={{ color: '#FF5722' }} /> },
];

function NewTransaction() {
  const [amount, setAmount] = React.useState('');
  const [transactionType, setTransactionType] = React.useState('credit');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [totalBalance, setTotalBalance] = React.useState(10000);


  const { token, setAlertMsg, setOpen, setErrorOcc, transactions, setTransactions,setTotalBalance,totalBalance,donatedAmt,setDonatedAmt,apiUrl } = React.useContext(AppContext);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleTransactionTypeChange = (e) => setTransactionType(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);


  const updateMoney = async(money,donated)=>{
    console.log("Money:",money);
    console.log("donated:",donated);
    try {
      console.log(money);
      const  res = await axios.post(`${apiUrl}/update-money`, { amount: money,donated_amount:donated });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
}
  const handleSubmit = () => {
    if (!amount || !description || !date || !transactionType) {
      setAlertMsg("Please fill all the fields");
      setErrorOcc(true);
      setOpen(true);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const transactionData = {
          amount,
          transaction_type: transactionType,
          purpose: description,
          date,
        };

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        if (transactionType === "credit") {
          console.log(totalBalance+Number(amount));
          updateMoney(totalBalance+Number(amount),donatedAmt);
          setTotalBalance(totalBalance+Number(amount));
          // localStorage.setItem('totalBalance',totalBalance);
          // console.log(totalBalance);
        } else {
          if (totalBalance - Number(amount) < 0) {
            setAlertMsg("Insufficient Balance");
            setErrorOcc(true);
            setOpen(true);
            setLoading(false);
            return;
          }
          if(transactionType === "donation"){
            console.log("dnoated...")
              updateMoney(totalBalance - Number(amount),donatedAmt+Number(amount));
              setDonatedAmt(donatedAmt+Number(amount));
          }
          else
          {
            updateMoney(totalBalance-Number(amount),donatedAmt);
            setTotalBalance(totalBalance - Number(amount));
          }
          // localStorage.setItem('totalBalance', totalBalance - Number(amount));
        
        }

        const response = await axios.post(`${apiUrl}/api/transactions/add-transaction`, transactionData, { headers });

        if (response.data) {
          setTransactions([...transactions, response.data]);
          setAmount('');
          setDescription('');
          setDate(new Date().toISOString().split('T')[0]);
          setTransactionType('credit');
          setAlertMsg("Transaction added successfully");
          setErrorOcc(false);
        } else {
          setAlertMsg("Something went wrong");
          setErrorOcc(true);
        }
      } catch (error) {
        console.error('Error saving transaction:', error);
        setAlertMsg('Failed to save transaction. Please try again.');
        setErrorOcc(true);
      } finally {
        setOpen(true);
        setLoading(false);
      }
    }, 3000); // 3-second delay
  };

 

  return (
   <ThemeProvider theme={theme}>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      py: isMobile ? 2 : 4, // Reduced padding for mobile
      px: isMobile ? 1 : 2, // Reduced padding for mobile
      maxWidth: isMobile ? '95%' : '600px',
      backgroundColor: '#FFFFFF',
      borderRadius: 2, // Slightly less rounded for mobile
      boxShadow: 2,
      border: '1px solid #FF5722',
      margin: '10px auto', // Reduced margin for mobile
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        textAlign: 'center',
        color: '#FF5722',
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: isMobile ? '1rem' : '1.5rem', // Adjusted font size
      }}
    >
      New Transaction
    </Typography>

    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 3,
        width: '100%',
      }}
    >
      <TextField
        label="Amount"
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeIcon sx={{ color: '#FF5722' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#FF5722' },
            '&:hover fieldset': { borderColor: '#FF5722' },
            '&.Mui-focused fieldset': { borderColor: '#FF5722' },
            height: isMobile ? '40px' : '56px', // Reduced height for mobile
          },
          '& input': { color: '#000000', fontSize: isMobile ? '0.8rem' : '1rem' },
          '& label': { color: '#000000', fontSize: isMobile ? '0.75rem' : '1rem' },
        }}
      />

      <TextField
        select
        label="Transaction Type"
        value={transactionType}
        onChange={handleTransactionTypeChange}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#FF5722' },
            '&:hover fieldset': { borderColor: '#FF5722' },
            '&.Mui-focused fieldset': { borderColor: '#FF5722' },
            height: isMobile ? '40px' : '56px', // Reduced height for mobile
          },
          '& input': { color: '#000000', fontSize: isMobile ? '0.8rem' : '1rem' },
          '& label': { color: '#000000', fontSize: isMobile ? '0.75rem' : '1rem' },
        }}
      >
        {transactionTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box display="flex" alignItems="center">
              {option.icon}
              <Typography sx={{ ml: 1, color: '#000000', fontWeight: 'medium', fontSize: isMobile ? '0.8rem' : '1rem' }}>
                {option.label}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </TextField>
    </Box>

    <TextField
      label="Description"
      value={description}
      onChange={handleDescriptionChange}
      fullWidth
      multiline
      rows={isMobile ? 3 : 4} // Adjusted rows for mobile
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#FF5722' },
          '&:hover fieldset': { borderColor: '#FF5722' },
          '&.Mui-focused fieldset': { borderColor: '#FF5722' },
        },
        '& textarea': { color: '#000000', fontSize: isMobile ? '0.8rem' : '1rem' },
        '& label': { color: '#000000', fontSize: isMobile ? '0.75rem' : '1rem' },
      }}
    />

    <TextField
      label="Date"
      type="date"
      value={date}
      onChange={handleDateChange}
      fullWidth
      InputLabelProps={{ shrink: true }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#FF5722' },
          '&:hover fieldset': { borderColor: '#FF5722' },
          '&.Mui-focused fieldset': { borderColor: '#FF5722' },
          height: isMobile ? '40px' : '56px', // Reduced height for mobile
        },
        '& input': { color: '#000000', fontSize: isMobile ? '0.8rem' : '1rem' },
        '& label': { color: '#000000', fontSize: isMobile ? '0.75rem' : '1rem' },
      }}
    />

    <Button
      variant="contained"
      sx={{
        backgroundColor: '#FF5722',
        color: '#FFFFFF',
        '&:hover': { backgroundColor: '#E64A19' },
        width: '100%',
        padding: isMobile ? '8px' : '12px', // Reduced padding for mobile
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: isMobile ? '0.8rem' : '1rem', // Adjusted font size
      }}
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? <CircularProgress size={20} sx={{ color: '#FFFFFF' }} /> : 'Submit'}
    </Button>
  </Box>
</ThemeProvider>

  );
}

export default NewTransaction;

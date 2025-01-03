import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid, IconButton, TextField, MenuItem, Select, FormControl, InputLabel, Button, Divider ,CircularProgress,useMediaQuery} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SearchIcon from '@mui/icons-material/Search';
import {
  CreditScore,
  VolunteerActivism,
  Handshake,
  MoneyOff
} from '@mui/icons-material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SavingsIcon from '@mui/icons-material/Savings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../../../context/Context';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { blue } from '@mui/material/colors';
import TransactionCard from './TransactionCard';

function PastTransactions() {
  const {
    transactions,
    setTransactions,
    filteredTransactions,
    setFilteredTransactions,
    setOpen,
    setErrorOcc,
    setAlertMsg
  } = useContext(AppContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('amount');
  const [selectedDate, setSelectedDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const { token,apiUrl } = useContext(AppContext);

  const[loading,setLoading] = useState(false);
  const[delLoading,setDelLoading] = useState(false);
  const[editLoading,setEditLoading]=useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const[isDeleted,setIsDeleted] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

   // State for the Edit Modal
   const [editData, setEditData] = useState({
    amount: '',
    date: '',
    transaction_type: '',
    purpose: ''
  });

  const handleDeleteClick = (id) => {
    setTransactionId(id);
    setOpenDeleteModal(true);
  };

  
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    
    const getTransactions = async () => {
      const response = await axios.get(`${apiUrl}/api/transactions/get-all-transactions`, { headers });
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    };

    getTransactions();
  }, [searchType]);

  const getTransactionTypeText = (type) => {
    switch (type) {
      case 'credit':
        return 'Credited From';
      case 'debit':
        return 'Debited To';
      case 'donation':
        return 'Donated To';
      default:
        return 'Transaction';
    }
  };

  const handleSearch = () => {
    let filtered = transactions;

    if (searchType === 'amount' && (isNaN(searchTerm) || searchTerm === '')) {
      setAlertMsg("Please enter a valid number for the amount.");
      setErrorOcc(true);
      setOpen(true);
      return;
    } else if (searchType === 'date' && !selectedDate) {
      setAlertMsg("Please select a valid date.");
      setErrorOcc(true);
      setOpen(true);
      return;
    } else if (searchType === 'type' && !transactionType) {
      setAlertMsg("Please select a valid transaction type: credit, debit, or donation.");
      setErrorOcc(true);
      setOpen(true);
      return;
    }

    setLoading(true);

    setTimeout(()=>{
      if (searchType === 'amount') {
        filtered = transactions.filter(transaction => transaction.amount.toString() === searchTerm);
      } else if (searchType === 'date') {
        filtered = transactions.filter(transaction => new Date(transaction.date).toISOString().split('T')[0] === selectedDate);
      } else if (searchType === 'type') {
        filtered = transactions.filter(transaction => transaction.transaction_type === transactionType);
      }
  
      setFilteredTransactions(filtered);
      setLoading(false);
    },2000)
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return <CreditScore sx={{ color: 'green' }} />;
      case 'debit':
        return <MoneyOff sx={{ color: 'red' }} />;
      case 'donation':
        return <VolunteerActivism sx={{ color: 'blue' }} />;
      default:
        return null;
    }
  };

  const handleEdit = async(transaction) => {
    // console.log(`Edit transaction with ID: ${id}`);
    // console.log(transaction);
    setEditData({
      amount: transaction.amount,Text,
      date: transaction.date,
      transaction_type: transaction.transaction_type,
      purpose: transaction.purpose
    })
    setOpenEditModal(true);
    setTransactionId(transaction._id);
  };

  const handleDelete = async (id) => {

    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    setDelLoading(true);
    setTimeout(async()=>{

    try {
      console.log("Token"+token);
      console.log(id + "in hadnl delte");
      const response = await axios.delete(`${apiUrl}/api/transactions/delete-transaction/${id}`, { headers });
      if (response.data) {

        const getTransactions = async () => {
          const response = await axios.get(`${apiUrl}/api/transactions/get-all-transactions`, { headers });
          setTransactions(response.data);
          setFilteredTransactions(response.data);

        };
    
        getTransactions();
        // handleSearch();
        setAlertMsg("Deleted Successfully");
        setErrorOcc(false);
        setOpen(true);
      } else {
        setAlertMsg("Something went wrong");
        setErrorOcc(true);
        setOpen(true);
      }
    } catch (error) {
      setAlertMsg("Error deleting transaction");
      setErrorOcc(true);
      setOpen(true);
    } finally {
      setOpenDeleteModal(false); // Close modal after delete action
    }
    setDelLoading(false);
    },3000);
  };

  const handleUpdate = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    console.log("token"+token+"in hu");
    // console.log("Id"+);

    setEditLoading(true);
    setTimeout(async()=>{
      try {
        const response =  await axios.put(`${apiUrl}/api/transactions/update-transaction/${transactionId}`, editData, { headers });
        console.log(response);
        if(response.data){
          setAlertMsg("Transaction updated successfully");
          setErrorOcc(false);
          setOpen(true);
          setOpenEditModal(false); // Close the modal after updating
          // Optionally refresh transactions
          const response = await axios.get(`${apiUrl}/api/transactions/get-all-transactions`, { headers });
          setTransactions(response.data);
          setFilteredTransactions(response.data);
        }
        else
        {
          setAlertMsg("Not Updated..");
          setErrorOcc(true);
          setOpen(true);
        }
      } catch (error) {
        setAlertMsg("Error updating transaction");
        setErrorOcc(true);
        setOpen(true);
      }
      setEditLoading(false);
    },3000);

    
  };
  const isMobile = useMediaQuery('(max-width:600px)'); // Check for mobile view
  return (
    <>
       <Box sx={{ mb: 3 }}>
      <Grid
        container
        spacing={isMobile ? 1 : 2}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Search Type Input */}
        <Grid item xs={isMobile ? 4 : 3}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ height: '56px' }}
          >
            <InputLabel id="search-type-label">Search By</InputLabel>
            <Select
              labelId="search-type-label"
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearchTerm('');
                setSelectedDate('');
                setTransactionType('');
              }}
              label="Search By"
              sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
            >
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="type">Transaction Type</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Conditional Input Field */}
        <Grid item xs={isMobile ? 6 : 7}>
          {searchType === 'date' ? (
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{
                fontSize: isMobile ? '0.8rem' : '1rem',
              }}
              InputProps={{
                style: { fontSize: isMobile ? '0.8rem' : '1rem' },
              }}
            />
          ) : searchType === 'type' ? (
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                id="transaction-type-label"
                sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
              >
                Transaction Type
              </InputLabel>
              <Select
                labelId="transaction-type-label"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                label="Transaction Type"
                sx={{
                  fontSize: isMobile ? '0.8rem' : '1rem',
                }}
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
                <MenuItem value="donation">Donation</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              label={`Search ${searchType.charAt(0).toUpperCase() + searchType?.slice(1)}`}
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
                fontSize: isMobile ? '0.8rem' : '1rem',
              }}
              InputProps={{
                style: { fontSize: isMobile ? '0.8rem' : '1rem' },
              }}
            />
          )}
        </Grid>

        {/* Search Button */}
        <Grid item xs={isMobile ? 2 : 2}>
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{
              height: isMobile?'48px':'56px',
              backgroundColor: 'orange',
              color: 'white',
              fontWeight: 'bold',
              fontSize: isMobile ? '0.8rem' : '1rem',
              border: 'none',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FF9800',
                border: 'none',
                outline: 'none',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isMobile ? (
              <SearchIcon />
            ) : (
              'Search'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>


      <Box sx={{ mt: 3 }}>
        {filteredTransactions.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            No transactions available 
          </Typography>
        ) : (
 
          filteredTransactions.map((transaction, index) => {
              return <TransactionCard transaction={transaction}  onEdit={handleEdit} onDelete={handleDeleteClick}/>
          })
        )}
      </Box>

      {/* Confirmation Modal */}
      <Dialog
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  // sx={{
  //   '& .MuiDialogTitle-root': {
  //     backgroundColor: '#FF5722', // Orange background for title
  //     color: '#FFFFFF', // White text for title
  //   },
  //   '& .MuiDialogContent-root': {
  //     backgroundColor: '#FFFFFF', // White background for content
  //     color: '#000000', // Black text for content
  //   },
  //   '& .MuiDialogActions-root': {
  //     backgroundColor: '#FFFFFF', // White background for actions
  //   },
  //   '& .MuiDialog-paper': {
  //     borderRadius: '12px', // Set border radius for the dialog box
  //   },
  // }}
  sx={{
    '& .MuiDialogTitle-root': {
      backgroundColor: '#FF5722', // Orange background for title
      color: '#FFFFFF', // White text for title
      fontWeight: 'bold', // Bold text
      fontSize: { xs: '1rem', sm: '1.5rem' }, // Larger font size
      textAlign: 'center', // Center-align text
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'space-between', // Space between buttons
      padding: '16px', // Add padding to actions
    },
    '& .MuiDialog-paper': {
      borderRadius: '12px', // Rounded corners for the dialog box
    },
    '& .MuiDialogContent-root': {
      padding: '16px', // Add padding to content
      fontSize:{xs:"0.4rem",sm:"1rem"}

    },
  }}
>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>
    <DialogContentText sx={{ fontSize:{sm:'0.87rem',md:'1rem'}, color: '#757575' }}>
      Are you sure you want to delete this transaction?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDeleteModal(false)} sx={{
        color: '#FFFFFF',
        backgroundColor: '#757575',
        '&:hover': {
          backgroundColor: '#5C5C5C',
        },
        padding:{ xs: '4px 8px', sm: '8px 16px' },
        borderRadius: '8px',
        fontWeight: 'bold',
      }}>
      Cancel
    </Button>
    <Button onClick={() => handleDelete(transactionId)} sx={{
        color: '#FFFFFF',
        backgroundColor: '#FF5722',
        '&:hover': {
          backgroundColor: '#E64A19',
        },
        padding: { xs: '4px 8px', sm: '8px 16px' },
        borderRadius: '8px',
        fontWeight: 'bold',
      }}>
      {delLoading ? <CircularProgress color="white" size={24} /> : 'Delete'}
    </Button>
  </DialogActions>
</Dialog>





      {/* Edit Modal */}
      <Dialog
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
  sx={{
    '& .MuiDialogTitle-root': {
      backgroundColor: '#FF5722',
      color: '#FFFFFF',
      fontSize: '1.25rem',
      textAlign: 'center',
      padding: '16px 8px', // Reduced padding
    },
    '& .MuiDialogContent-root': {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      padding: {sm:'6px 12px',md:'16px 24px'}// Reduced padding
    },
    '& .MuiDialogActions-root': {
      backgroundColor: '#FFFFFF',
      padding: '8px', // Reduced padding
    },
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      maxWidth: { sm: '90%', md: '500px' },
      margin: '0 auto',
    },
    // Reduced padding
  }}
>
  <DialogTitle sx={{ fontSize: '1.25rem', textAlign: 'center', padding: '8px' }}>{transactionId ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
  <DialogContent>
    <TextField
      label="Amount"
      type="number"
      value={editData.amount}
      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
      fullWidth
      margin="normal"
      variant="outlined"
      InputProps={{
        sx: {
          padding: '0px', // Reduced padding
        },
      }}
    />
    <TextField
      label="Date"
      type="date"
      value={editData.date.split('T')[0]}
      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
      fullWidth
      margin="normal"
      variant="outlined"
      InputProps={{
        sx: {
          padding: '0px', // Reduced padding
        },
      }}
    />
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel>Transaction Type</InputLabel>
      <Select
        value={editData.transaction_type}
        onChange={(e) => setEditData({ ...editData, transaction_type: e.target.value })}
        sx={{
          padding: '8px', // Reduced padding
          '& .MuiSelect-select': {
            padding: '4px 8px', // Reduced padding for select dropdown
          },
        }}
      >
        <MenuItem value="credit">Credit</MenuItem>
        <MenuItem value="debit">Debit</MenuItem>
        <MenuItem value="donation">Donation</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Purpose"
      value={editData.purpose}
      onChange={(e) => setEditData({ ...editData, purpose: e.target.value })}
      fullWidth
      margin="normal"
      variant="outlined"
      multiline
      rows={3}
      InputProps={{
        sx: {
          padding: '8px', // Reduced padding
        },
      }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => setOpenEditModal(false)}
      sx={{
        color: '#FF5722',
        fontSize: '0.875rem',
        padding: '4px 8px', // Reduced padding
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleUpdate}
      sx={{
        backgroundColor: '#FF5722',
        color: '#FFFFFF',
        fontSize: '0.875rem',
        padding: '4px 8px', // Reduced padding
      }}
    >
      {editLoading ? <CircularProgress size={20} sx={{ color: '#FFFFFF' }} /> : 'Update'}
    </Button>
  </DialogActions>
</Dialog>





    </>
  );
}

export default PastTransactions;

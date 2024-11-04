// import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import Navbar from './components/Navbar';
// import {Routes,Route} from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import Event from './Pages/Event/Event';
// import Transactions from './Pages/Transaction/TransactionPage';
// import About from './Pages/About/AboutPage';
// import Services from './Pages/Ourservices/OurservicesPage';
// import Login from './Pages/Login/LoginPage';
// import Footer from './components/footer';
// import Dashbord from './Pages/Dashbord/Dashbord';
// import { useContext } from 'react';
// import { AppContext } from './context/Context';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import ProfileContainer from './Pages/Profile/ProfilePage';
// import Chaitra from './components/Event/Chaitra';
// import NewTransaction from './components/Dashbord/Accountant/NewTransaction';
// import PastTransactions from './components/Dashbord/Accountant/PastTransactions';
// import NewTestimonial from './components/Dashbord/Admin/Testimonials/NewTestimonial';
// import AllTestimonials from './components/Dashbord/Admin/Testimonials/AllTestimonials';
// import NewActivity from './components/Dashbord/Admin/Activities/NewActivity';
// import AllActivities from './components/Dashbord/Admin/Activities/AllActivities';
// import AllUsers from './components/Dashbord/Admin/Users/AllUsers';
// import { PrivateRoute } from './components/PrivateRoute';
// import NewUser from "./components/Dashbord/Admin/Users/NewUser";
// import EventDetail from './components/Event/Chaitra';
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// function App() {
//   const{handleClose,open,alertMsg,errorOcc} = useContext(AppContext);
//   return (
//     <>
//       <Navbar />
//       {
        
//         <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         // anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
//       >
//         {
//           errorOcc?<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//           {alertMsg}
//         </Alert>:
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           {alertMsg}
//         </Alert>
//         }
//       </Snackbar>
      
//     }
//       <Routes>
//         <Route  path='/' element={<Home />}/>
        
//         <Route path='/events' element={<Event />} />
//         <Route path="/events/:eventName" element={<EventDetail />} />
//         <Route path='/transactions' element={<Transactions />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/services' element={<Services />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/dashboard' element={<PrivateRoute><Dashbord /></PrivateRoute>} >
//         <Route path='new-transaction' element={<NewTransaction />} />
//         <Route path='past-transactions' element={<PastTransactions />} />
//         <Route path='new-testimonial' element={<NewTestimonial />} />
//         <Route path='all-testimonials' element={<AllTestimonials />} />
//         <Route path='new-activity'  element={<NewActivity />} />
//         <Route path='all-activities' element={<AllActivities />} />
//         <Route path='users' element={<AllUsers />} />
//         <Route path='users/new' element={<NewUser />} />
//         </Route>
//         <Route path='/profile' element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
//         <Route path='/chaitra' element={<Chaitra />} ></Route>
//         <Route path='*' element={<Home />} />
//         <Route path='/dashboard' element={<Dashbord />} />
//         <Route path='/profile' element={<ProfileContainer />} />
        
//       </Routes>
//     <Footer />

//     </>
//   );
// }

// export default App;


import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Event from './Pages/Event/Event';
import Transactions from './Pages/Transaction/TransactionPage';
import About from './Pages/About/AboutPage';
import Services from './Pages/Ourservices/OurservicesPage';
import Login from './Pages/Login/LoginPage';
import Footer from './components/footer';
import Dashbord from './Pages/Dashbord/Dashbord';
import ProfileContainer from './Pages/Profile/ProfilePage';
import Chaitra from './components/Event/Chaitra';
import NewTransaction from './components/Dashbord/Accountant/NewTransaction';
import PastTransactions from './components/Dashbord/Accountant/PastTransactions';
import NewTestimonial from './components/Dashbord/Admin/Testimonials/NewTestimonial';
import AllTestimonials from './components/Dashbord/Admin/Testimonials/AllTestimonials';
import NewActivity from './components/Dashbord/Admin/Activities/NewActivity';
import AllActivities from './components/Dashbord/Admin/Activities/AllActivities';
import AllUsers from './components/Dashbord/Admin/Users/AllUsers';
import { PrivateRoute } from './components/PrivateRoute';
import NewUser from "./components/Dashbord/Admin/Users/NewUser";
import EventDetail from './components/Event/Chaitra';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from './context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { handleClose, open, alertMsg, errorOcc } = useContext(AppContext);

  return (
    <>
      <Navbar />
      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {errorOcc ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
        )}
      </Snackbar>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:eventName" element={<EventDetail />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashbord /></PrivateRoute>}>
          <Route path="new-transaction" element={<NewTransaction />} />
          <Route path="past-transactions" element={<PastTransactions />} />
          <Route path="new-testimonial" element={<NewTestimonial />} />
          <Route path="all-testimonials" element={<AllTestimonials />} />
          <Route path="new-activity" element={<NewActivity />} />
          <Route path="all-activities" element={<AllActivities />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="users/new" element={<NewUser />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
        <Route path="*" element={<Home />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;

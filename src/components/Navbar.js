
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import './navbar.css'; // Importing the styles
// import ProfileMenu from './profile';

// const drawerWidth = 280;
// const navItems = ['Home', 'Events', 'Transactions', 'Our Services', 'About Us'];
// const isLoged = false;

// function DrawerAppBar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'rgb(255, 177, 75)', height: '100%' }}>
//       <Typography variant="h6" sx={{ my: 2, color: '#fff' }}>
//         HHO
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton 
//               sx={{ 
//                 textAlign: 'center', 
//                 color: 'white', 
//                 '&:hover': {
//                   backgroundColor: 'white',
//                   color: '#ff9900',
//                 },
//               }}
//             >
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav" className="bg-orange">
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100px' }}>
//           {/* Left side: Logo */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: 'none' } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <a href="/">
//               <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/v1726826896/HHO/navbar/hho_logo_s548ea.png" alt="Logo" className="navbar-logo" />
//             </a>
//           </Box>

//           {/* Center: Navigation links only for larger screens */}
//           <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
//             {navItems.map((item) => (
//               <Button key={item} className="nav-link" sx={{ color: '#fff' }}>
//                 {item}
//               </Button>
//             ))}
//           </Box>

//           {/* Right: Login button */}
//           {isLoged ? (
//             <ProfileMenu />
//           ) : (
//             <Button className="nav-login" sx={{ ml: 2 }}>
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(255, 177, 75)' },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }

// DrawerAppBar.propTypes = {
//   window: PropTypes.func,
// };

// export default DrawerAppBar;


import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './navbar.css'; // Importing the styles
import ProfileMenu from './profile';
import { AppContext } from '../context/Context';

const drawerWidth = 0;
const navItems = ['Home', 'Events', 'Transactions', 'Our Services', 'About Us'];
// const isLoged = true;

function DrawerAppBar(props) {

  const{token,setToken} = React.useContext(AppContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Move getLinkForNavItem function here, above the JSX
  const getLinkForNavItem = (item) => {
    switch (item) {
      case 'Home':
        return '/';
      case 'Events':
        return '/events';
      case 'Transactions':
        return '/transactions';
      case 'Our Services':
        return '/services';
      case 'About Us':
        return '/about';
      default:
        return '/';
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'rgb(255, 177, 75)', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#fff' }}>
        HHO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#ff9900',
                },
              }}
              component={Link}
              to={getLinkForNavItem(item)}  // Link for navigation items
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" className="bg-orange">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
          {/* Left side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <a href="/">
              <img src="https://res.cloudinary.com/dnbeeynnu/image/upload/v1726826896/HHO/navbar/hho_logo_s548ea.png" alt="Logo" className="navbar-logo" />
            </a>
          </Box>

          {/* Center: Navigation links only for larger screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Link key={item} to={getLinkForNavItem(item)} className="nav-link" sx={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>
                {item}
              </Link>
            ))}
          </Box>

          {/* Right: Login button */}
          {token ? (
            <ProfileMenu />
          ) : (
            <Link className='nav-login ml-2' to='/login'> Login</Link>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(255, 177, 75)' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;

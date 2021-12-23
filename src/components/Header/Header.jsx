import StoreIcon from '@mui/icons-material/Store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register/Register';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
}));

export default function Header() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackDropClick = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StoreIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.link} to="/">
              Empty Store
            </Link>
          </Typography>

          <NavLink className={classes.link} to="/todos" activeClassName="active-menu">
            <Button color="inherit">Todo List</Button>
          </NavLink>
          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">Album List</Button>
          </NavLink>

          <Button color="inherit" onClick={handleClickOpen}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        onBackdropClick={handleBackDropClick}
      >
        <DialogContent>
          {/* <DialogContentText> */}
          <Register />
          {/* </DialogContentText> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

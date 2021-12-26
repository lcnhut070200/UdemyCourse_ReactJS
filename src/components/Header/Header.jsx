import { AppBar, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register/Register';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Login from '../../features/Auth/components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../../features/Auth/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 10,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const dispatch = useDispatch();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return false;
    }
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <StoreMallDirectoryIcon edge="start" className={classes.menuButton} color="inherit" />
          <Typography variant="h6" className={classes.title}>
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
          {!isLoggedIn ? (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          ) : (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon></CloseIcon>
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER ? (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center" onClick={() => setMode(MODE.LOGIN)}>
                <Button color="primary">Already have an account, Login here</Button>
              </Box>
            </>
          ) : (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center" onClick={() => setMode(MODE.REGISTER)}>
                <Button color="primary">Don't have an account, Register here</Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

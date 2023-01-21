import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import {ClearUser} from '../redux/user/actions'
import {ClearToken} from '../redux/token/actions'

// import styles from '../stylesheets/navbar.module.css'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
      title: {
        // display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
          fontSize:"1.3rem"
        },
        fontSize:"1rem",
        fontWeight:"600"
      },
      titleLink: {
        textDecoration:"none",
        color:"#081984"
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#f4f6fc",
        '&:hover': {
          backgroundColor: fade("#f4f6fc", 0.65),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          marginLeft: theme.spacing(30),
          width: '50%',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        color: '#87898c',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: '#87898c',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
    }))

const Navbar = () => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const history=useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="#87898c"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton  color="#87898c">
          <Badge  color="#87898c">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const logoutHandler=()=>{
        localStorage.clear();
        dispatch(ClearToken())
        dispatch(ClearUser())
        history.push('/login')
  }

    return (
        <div className={classes.grow} >
            <AppBar position="static" style={{backgroundColor:"white",position:"relative"}}>
                <Toolbar>
                <Typography className={classes.title}  >
                    <Link to="/" className={classes.titleLink} >ChatSprint</Link>
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                         placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton
                        // edge="end"
                         aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="#87898c"
                    >
                        <AccountCircle fontSize="large" />
                    </IconButton>
                    <IconButton  color="#87898c" onClick={logoutHandler}>
                        <Badge color="secondary">
                            <ExitToAppIcon fontSize="medium" />
                        </Badge>
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="#87898c"
                    >
                    <MoreIcon  />
                    </IconButton>
                 </div>
                </Toolbar>
                {renderMobileMenu}
                {renderMenu}
            </AppBar>
            
        </div>
    )
}

export default Navbar

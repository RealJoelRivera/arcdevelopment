import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles(theme => ({
  // Makes sure the header gets the default styling
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // displays the content that was hiding behind the toolbar
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  // extends the tabs over to the right side
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    // pixels used to maintain constant spacing regardless of screen size
    marginLeft: '25px'
  },
  button: {
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    fontFamily: 'Pacifico',
    fontSize: '1rem',
    textTransform: 'none',
    height: '45px',
    color: 'white',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(true)
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(index)

  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(false)
  };

  const menuOptions = [
    {name: 'Services', link: '/services'},
    {name: 'Custom Software Development', link: '/customsoftware'},
    {name: 'Mobile App Development', link: '/mobileapps'},
    {name: 'Website Development', link: '/websites'}
  ]

  useEffect(()=> {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/services' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/revolution' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/about' && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === '/contact' && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === '/estimate' && value !== 5) {
      setValue(5);
    }
  }, [value]);

  const tabs = () => (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
      >
        <Tab className={classes.tab} component={Link} to='/' label='Home'/>
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={(event) => handleClick(event)}
          to='/services'
          label='Services'
        />
        <Tab className={classes.tab} component={Link} to='/revolution' label='The Revolution'/>
        <Tab className={classes.tab} component={Link} to='/about' label='About'/>
        <Tab className={classes.tab} component={Link} to='/contact' label='Contact Us'/>
      </Tabs>
      <Button variant='contained' color='secondary' className={classes.button}>Free Estimate</Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{paper: classes.menu}}
        MenuListProps={{onMouseLeave: handleClose}}
        elevation={0}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{root: classes.menuItem}}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              setValue(1);
              handleClose();
            }}
            selected={index === selectedIndex}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <>
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {setOpenDrawer(false)}}
        onOpen={() => setOpenDrawer(true)}
      >
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
        </IconButton>
      </SwipeableDrawer>;
    </>
  )

    return (
      <>
        <ElevationScroll>
          <AppBar position='fixed'>
            <Toolbar disableGutters>
              <Button
                component={Link}
                to='/'
                className={classes.logoContainer}
                onClick={() => setValue(0)}
                disableRipple
              >
                <img alt='company logo' className={classes.logo} src={logo} />
              </Button>
              {matches ? drawer : tabs()}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

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
  },
  logo: {
    height: '8em',
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
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
}));

const Header = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

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

    return (
      <>
        <ElevationScroll>
          <AppBar position="fixed">
            <Toolbar disableGutters>
              <Button
                component={Link}
                to="/"
                className={classes.logoContainer}
                onClick={() => setValue(0)}
                disableRipple
              >
                <img alt="company logo" className={classes.logo} src={logo} />
              </Button>
              <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
              >
                <Tab className={classes.tab} component={Link} to="/" label="Home"/>
                <Tab className={classes.tab} component={Link} to="/services" label="Services"/>
                <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution"/>
                <Tab className={classes.tab} component={Link} to="/about" label="About"/>
                <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us"/>
              </Tabs>
              <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </>
    );
};

export default Header;

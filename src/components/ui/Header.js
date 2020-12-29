import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';

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
    height: '7em',
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

    return (
      <>
        <ElevationScroll>
          <AppBar position="fixed">
            <Toolbar disableGutters>
              <img alt="company logo" className={classes.logo} src={logo} />
              <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
              >
                <Tab className={classes.tab} label="Home"/>
                <Tab className={classes.tab} label="Services"/>
                <Tab className={classes.tab} label="The Revolution"/>
                <Tab className={classes.tab} label="About"/>
                <Tab className={classes.tab} label="Contact Us"/>
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

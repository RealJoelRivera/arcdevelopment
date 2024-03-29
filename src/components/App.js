import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './ui/Theme';
import Header from './ui/Header';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/services" component={() => <div>Services</div>} />
          <Route exact path="/customsoftware" component={() => <div>Custom Software</div>} />
          <Route exact path="/mobileapps" component={() => <div>Mobile Apps</div>} />
          <Route exact path="/websites" component={() => <div>Websites</div>} />
          <Route exact path="/revolution" component={() => <div>The Revolution</div>} />
          <Route exact path="/about" component={() => <div>About</div>} />
          <Route exact path="/contact" component={() => <div>Contact</div>} />
          <Route exact path="/estimate" component={() => <div>Estimate</div>} />
          <Route exact path="/" component={() => <div>Home</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

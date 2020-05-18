import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home page/Home';
import Footer from './components/footer/Footer';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
    <Footer />
  </Router>
);

export default App;

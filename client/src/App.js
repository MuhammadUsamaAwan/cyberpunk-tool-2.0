import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/landing/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';
import Alert from './components/layout/Alert';
import Builds from './components/builds/Builds';
import Profile from './components/profile/Profile';
//Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './ultis/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <Route exact path='/changepassword' component={ChangePassword} />
            <Route exact path='/builds' component={Builds} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </section>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;

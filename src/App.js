import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Components/Common/Header';
import ProductTable from './Components/Table/ProductTable';
import setAuthToken from './utils/setAuthToken';

import store from './store';
import { Provider } from 'react-redux';
import Register from './pages/signup/Register';
import Login from './pages/signin/Login';

import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

//setAuthToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjMzMmZhNmUyNDRjNDE5ZDI5OGFmMiIsIm5hbWUiOiJBbnVqIFNpbmdoIiwiaWF0IjoxNTYzNDMwMDg1LCJleHAiOjE1NjM1MTY0ODV9.8CxsW9bGRZQ8SpcFDmzMag6CXCLCsH7TpI21DaAVuwI');
// Check for tokens
if(localStorage.jwtToken){
  // Set uth Token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token gef user info from token
   const decoded = jwt_decode(localStorage.jwtToken);
   // Set User and isAuthenticated
   store.dispatch(setCurrentUser(decoded));

   // Check for expired token
   const currentTime = Date.now()/1000;
   if(decoded.exp < currentTime){
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = '/';

   }
}

function App() {
  return (
    <Provider store={ store }>
    <Router> 
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={ProductTable} />
    </Router>
    </Provider>
  );
}

export default App;

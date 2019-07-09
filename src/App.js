import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Header from './Components/Common/Header';
import ProductTable from './Components/Table/ProductTable';
//import setAuthToken from './utils/setAuthToken';

import store from './store';
import { Provider } from 'react-redux';

// // Check for tokens
// if(localStorage.jwtToken){
//   // Set auth Token header auth
//   setAuthToken(localStorage.jwtToken);
// }

function App() {
  return (
    <Provider store={ store }>
    <Router> 
      <Header />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/" component={ProductTable} />
      {/* <ProductTable /> */}
    </Router>
    </Provider>
  );
}

export default App;

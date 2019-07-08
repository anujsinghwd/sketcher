import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Header from './Components/Common/Header';
import ProductTable from './Components/Table/ProductTable';

function App() {
  return (
    <Router> 
      <Header />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <ProductTable />
    </Router>
  );
}

export default App;

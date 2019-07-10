import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Header from './Components/Common/Header';
import ProductTable from './Components/Table/ProductTable';
import setAuthToken from './utils/setAuthToken';

import store from './store';
import { Provider } from 'react-redux';

setAuthToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjMzMmZhNmUyNDRjNDE5ZDI5OGFmMiIsIm5hbWUiOiJBbnVqIFNpbmdoIiwiaWF0IjoxNTYyNzg1NzYxLCJleHAiOjE1NjI4NzIxNjF9.H3wzXc0oaR_xmFODncq_WC5ihOZ2eNm-D2Qlc7qjPbs');

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

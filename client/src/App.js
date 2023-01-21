import React from 'react';
import {BrowserRouter,Switch} from 'react-router-dom'

import ProtectedRoute from './components/routes/Protected'
import UnprotectedRoute from './components/routes/Unprotected'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"

const Routing=()=>{
  return (
    <Switch>
      <UnprotectedRoute exact path="/login" component={Login} />
      <UnprotectedRoute exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  )
}


function App() {
  return (
    <>
    <BrowserRouter>
    <Routing />
    </BrowserRouter>
    </>
  );
}

export default App;

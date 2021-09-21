import React, {useEffect, useState} from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function App() {


  const [user, setUser] = useState(null);

  useEffect(()=>{
    const auth = getAuth();
onAuthStateChanged(auth, user=>{
  setUser(user)
})
  },[])

  return (
    <div className="App">


      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>

     
    </div>
  );
}

export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import DocumentForm from "./components/form/DocumentForm";
import FileUpload from "./components/fileUpload/FileUpload";
import DocumentsList from "./components/list/DocumentsList";
import DocumentEdit from "./components/form/DocumentEdit";
import OneDocument from "./components/list/OneDocument";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/document" component={DocumentForm} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/upload" component={FileUpload} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/list" component={DocumentsList} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit/:id" component={DocumentEdit} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/viev/:id" component={OneDocument} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

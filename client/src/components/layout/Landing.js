import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4 style={{ textAlign: "center" }}>
              <b>Hey there, pick what u want to do</b>
            </h4>
            <p className="flow-text grey-text text-darken-1"></p>
            <br />
          </div>
          <div className="col s12 offset-s5 ">
            <Link
              to="/login"
              style={{
                width: "200px",
                height: "70px",
                borderRadius: "7px",
                letterSpacing: "1.5px",
                color: "white",
              }}
              className="btn btn-large btn-flat center-align waves-effect green darken-4"
            >
              <b>Log In</b>
            </Link>
          </div>
          <div className="col s12 offset-s5">
            <Link
              to="/register"
              style={{
                top: "1rem",
                width: "200px",
                height: "70px",
                borderRadius: "7px",
                letterSpacing: "1.5px",
                color: "white",
              }}
              className="btn btn-large btn-flat waves-effect center-align  indigo darken-4"
            >
              <b>Register</b>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;

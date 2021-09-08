import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileExtention = file.name.split(".").pop();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>
            <Link
              to="/document"
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
                color: "black",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue"
            >
              <b>ADD DOCUMENT</b>
            </Link>
            <Link
              to="/upload"
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
                color: "black",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue darken-1"
            >
              <b>UPLOAD FILE</b>
            </Link>
            <Link
              to="/list"
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
                color: "black",
               
              }}
              className="btn btn-large waves-effect waves-light hoverable  blue darken-2"
            >
              <b>LIST FILES</b>
            </Link>
          </div>
          <div className="col s12 center-align">
          <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
                color: "black",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red lighten-1"
            >
             <b>Logout</b> 
            </button>
            </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);

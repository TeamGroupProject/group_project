import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
   /*   <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace",
              }}
              className="col s4 brand-logo center black-text"
            >
              Home
            </Link>
          </div>
        </nav>
      </div>*/
      <nav class="blue lighten-3">
      <div class="nav-wrapper">
        <a class="brand-logo center"><Link
              to="/dashboard"
              style={{
                fontFamily: "monospace",
             
              }}
              className="col s4 brand-logo center black-text"
            >
              Home
            </Link></a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
        </ul>
      </div>
    </nav>
    );
  }
}
export default Navbar;

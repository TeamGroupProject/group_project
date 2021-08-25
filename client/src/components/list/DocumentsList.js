import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
export default class ListDocuments extends Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);

    this.state = {
      document: [],
    };
  }

  deleteDocument(e) {
    const documentID = e.target.value;

    axios
      .delete("/document/delete/" + documentID)
      .then((res) => {
        console.log("Student successfully deleted!");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount(e) {
    const id = document.getElementById("user").value;
    axios
      .get("document/list", {
        params: { user: id },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ document: res.data });
      });
  }

  render() {
    const user = jwt_decode(localStorage.jwtToken);
    return (
      <div>
        <table>
          <tr>
            <th>author</th>
            <th>type</th>
            <th>title</th>
          </tr>
          <input type="hidden" id="user" name="user" value={user.id}></input>
          {this.state.document.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.author}</td>
              <td>{doc.type}</td>
              <td>{doc.title}</td>
              <td>
                <button
                  value={doc._id}
                  onClick={this.deleteDocument}
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  DELETE
                </button>
                <Link
                  to={"/edit/" + doc._id}
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  EDIT
                </Link>
                <Link
                  to={"/viev/" + doc._id}
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
                >
                  VIEV
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user: "",
      fileName: "",
      fileContent: "",
    };
  }

  onChangeFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.setState({ fileName: file.name, fileContent: reader.result });
    };
    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const newFile = {
      user: document.getElementById("user").value,
      fileName: this.state.fileName,
      fileContent: this.state.fileContent,
    };
    console.log(newFile);
    axios
      .post("document/upload", newFile)
      .then((res) => console.log(res.data), window.location.assign("/list"));

    this.setState({
      user: "",
      fileName: "",
      fileContent: "",
    });
  }

  render() {
    const user = jwt_decode(localStorage.jwtToken);
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s6 offset-s3">
            <div className="col s12 offset-s3" style={{ paddingLeft: "11.250px" }}>
              <h3><b>Upload File</b></h3>
            </div>

            <form onSubmit={this.onSubmit}>
              <div className="input-field col s12 offset-s3">
                <input type="hidden" id="user" name="user" value={user.id}></input>
                <input type="file" onChange={this.onChangeFile}></input>
              </div>
              <div className="col s8 offset-s3" style={{ paddingLeft: "11.250px" }}>
                  <button
                       style={{
                         width: "230px",
                         borderRadius: "8px",
                         letterSpacing: "1.5px",
                         marginTop: "1rem",
                         }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable green darken-4"
                    >
                      Upload
                  </button>
                  </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

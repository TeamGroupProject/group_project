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
      <div>
        <h3>Upload File</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="hidden" id="user" name="user" value={user.id}></input>
            <input type="file" onChange={this.onChangeFile}></input>
          </div>
          <div className="form-group">
            <input type="submit" value="Upload" className="btn btn-primary " />
          </div>
        </form>
      </div>
    );
  }
}

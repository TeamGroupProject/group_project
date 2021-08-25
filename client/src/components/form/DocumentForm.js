import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class CreateDocuments extends Component {
  constructor(props) {
    super(props);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user: "",
      type: "",
      author: "",
      title: "",
      year: "",
      month: "",
      email: "",
    };
  }

  onChangeMonth(e) {
    this.setState({
      month: e.target.value,
    });
  }
  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeAuthor(e) {
    this.setState({
      author: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onSubmit(e) {
    console.log("submit");
    e.preventDefault();
    const newDocument = {
      user: document.getElementById("user").value,
      type: this.state.type,
      author: this.state.author,
      title: this.state.title,
      year: this.state.year,
      month: this.state.month,
      email: this.state.email,
    };
    console.log(newDocument);

    axios
      .post("document/add", newDocument)
      .then((res) => console.log(res.data), window.location.assign("/list"));
    this.setState({
      user: "",
      type: "",
      author: "",
      title: "",
      year: "",
      month: "",
    });
  }
  render() {
    const user = jwt_decode(localStorage.jwtToken);
    return (
      <div>
        <h3>Create Document</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="hidden" id="user" name="user" value={user.id}></input>
            <label>Type: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            />
            <label>author: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
            <label>title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
            <label>year: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.year}
              onChange={this.onChangeYear}
            />
            <label>month: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.month}
              onChange={this.onChangeMonth}
            />
            <label>email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary " />
          </div>
        </form>
      </div>
    );
  }
}

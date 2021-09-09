import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import download from "downloadjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default class OneDocument extends Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangept = this.handleChangept.bind(this);
    this.showPlain = this.showPlain.bind(this);

    this.state = {
      citationOptions: [
        { value: "Bibtex", label: "Bibtex" },
        { value: "RIS", label: "RIS" },
        { value: "ENL", label: "EndNote" },
      ],
      plaintextOptions: [
        { value: "IEEE", label: "IEEE" },
        { value: "CMOS", label: "CMOS" },
        { value: "APA", label: "APA" },
      ],
      user: "",
      type: "",
      author: "",
      title: "",
      year: "",
      month: "",
      selectedOption: null,
      selectedOptionpt: null,
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      copied: false,
    };
  }

  downloadFile(e) {
    axios
      .get(
        "/document/download/" +
          this.state.selectedOption.value +
          "&" +
          e.target.value
        // {
        //   responseType: "blob",
        // }
      )
      .then((res) => {
        console.log(res);
        const content = res.headers["content-disposition"]
          .split("filename=")[1]
          .split(";")[0];
        return download(res.data, content.substr(1, content.length - 2));
      });
  }

  showPlain(e) {
    axios
      .get(
        "/document/showplain/" +
          this.state.selectedOptionpt.value +
          "&" +
          e.target.value
      )
      .then((res) => {
        document.getElementById("textarea1").value = res.data;
      });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value); //this prints the selected option
  };

  handleChangept = (selectedOptionpt) => {
    this.setState({ selectedOptionpt });
    console.log(`Option selected:`, selectedOptionpt.value); //this prints the selected option
  };

  deleteDocument(e) {
    const documentID = e.target.value;

    axios
      .delete("/document/delete/" + documentID)
      .then((res) => {
        console.log("Student successfully deleted!");
        window.location.assign("/list");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("/document/edit-document/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          author: res.data.author,
          title: res.data.title,
          year: res.data.year,
          month: res.data.month,
          type: res.data.type,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const user = jwt_decode(localStorage.jwtToken);
    const { selectedOption } = this.state;
    const { selectedOptionpt } = this.state;
    return (
      <div>
        {/*
        <form>
          <div className="input-field col s12" id="select">
            <select id="CitationType" defaultValue="">
              <option value="" disabled>
                Choose your option
              </option>
              <option value="Bibtex">Bibtex </option>
              <option value="EndNote">EndNote</option>
              <option value="RIS">RIS </option>
            </select>
            <label>Materialize Select</label>
          </div>

          <div>
            <button
              value={this.props.match.params.id}
              onClick={this.downloadFile}
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              DOWNLOAD
            </button>
          </div>
        </form>
            */}
        <input type="hidden" id="user" name="user" value={user.id}></input>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Type</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr key={this.props.match.params.id}>
              <td><b><i>{this.state.author}</i></b></td>
              <td><b><i>{this.state.type}</i></b></td>
              <td><b><i>{this.state.title}</i></b></td>
              <td>
              <Link
                  to={"/edit/" + this.props.match.params.id}
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
                <button
                  value={this.props.match.params.id}
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

              </td>
              <td>
                <div
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                >
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={this.state.plaintextOptions[0]}
                    value={selectedOptionpt}
                    onChange={this.handleChangept}
                    name="Citation"
                    options={this.state.plaintextOptions}
                  />
                </div>
                {/* <TextInput
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => onChangeText(text)}
                  value={value}
                  style={{ padding: 10 }}
               />*/}
              </td>

              <td>
                <div>
                  <button
                    value={this.props.match.params.id}
                    onClick={this.showPlain}
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      margin: "1rem",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable green darken-1"
                  >
                    SHOW PLAIN TEXT
                  </button>
                </div>
              </td>

              {
                //u dolu jest select do formatow cyfrowych  u gory do plaintexta
              }

              <td>
                <div
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                >
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={this.state.citationOptions[0]}
                    value={selectedOption}
                    onChange={this.handleChange}
                    name="Citation"
                    options={this.state.citationOptions}
                  />
                </div>
              </td>
              <td>
                <div>
                  <button
                    value={this.props.match.params.id}
                    onClick={this.downloadFile}
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      margin: "1rem",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable  orange darken-3"
                  >
                    DOWNLOAD
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <div class="container">
        <div class="row">
          <form class="col s5">
            <div class="row">
              <div class="input-field col s12 offset-s8">
                <textarea
                  id="textarea1"
                  class="materialize-textarea"
                  placeholder="Plain Text Here"
                ></textarea>
                <button
                  style={{
                  padding: 0,
                  border: 0,
                  float: "left",
                  width: "200px",
                  left: "10rem",
                  borderRadius: "7px",
                  }}
                    onClick={() => {
                    navigator.clipboard.writeText(
                    document.getElementById("textarea1").value
                  );
                }}
                  className="waves-effect waves-light btn"
                >
                  <i class="material-icons dp48">content_copy</i>
                </button>

              </div>
            </div>
          </form>
          
        </div>
      </div>
      </div>
    );
  }
}

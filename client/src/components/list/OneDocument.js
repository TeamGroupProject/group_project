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
      email: "",
      publisher: "",
      publisherAddress: "",
      edition: "",
      volume: "",
      editor: "",
      doi: "",
      institution: "",
      organization: "",
      chapter: "",
      school: "",
      crossref: "",
      series: "",
      note: "",
      authorAddress: "",
      placePublished: "",
      keywords: "",
      language: "",
      numberOfVolumes: "",
      ISBN: "",
      URL: "",
      alternateTitle: "",


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
          email: res.data.email,
          publisher: res.data.publisher,
          publisherAddress: res.data.publisherAddress,
          volume: res.data.volume,
          edition: res.data.edition,
          editor: res.data.editor,
          doi: res.data.doi,
          institution: res.data.institution,
          organization: res.data.organization,
          chapter: res.data.chapter,
          school: res.data.school,
          crossref: res.data.crossref,
          series: res.data.series,
          note: res.data.note,
          authorAddress: res.data.authorAddress,
          placePublished: res.data.placePublished,
          keywords: res.data.keywords,
          language: res.data.language,
          numberOfVolumes: res.data.numberOfVolumes,
          alternateTitle: res.data.alternateTitle,
          
          ISBN: res.data.ISBN,
          URL: res.data.URL,
          
          
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
        <div class="row">
        <div class="col s12">
        <div class="col s3 offset-s3">
          <br></br> <br></br>
        <table>
          
          <tr key={this.props.match.params.id}>
              <tr><b>Author:  </b><i>{this.state.author}</i></tr>
              <tr><b>Type:  </b><i>{this.state.author}</i></tr>
              <tr><b>Title:  </b><i>{this.state.title}</i></tr>
              <tr><b>Year:  </b><i>{this.state.year}</i></tr>
              <tr><b>Month:  </b><i>{this.state.month}</i></tr>
              <tr><b>Email:  </b><i>{this.state.email}</i></tr>
              <tr><b>Publisher:  </b><i>{this.state.publisher}</i></tr>
              <tr><b>Publisher Address:  </b><i>{this.state.publisherAddress}</i></tr>
              <tr><b>Edition:  </b><i>{this.state.edition}</i></tr>
              <tr><b>Volume:  </b><i>{this.state.volume}</i></tr>
              <tr><b>Editor:  </b><i>{this.state.editor}</i></tr>
              <tr><b>DOI:  </b><i>{this.state.doi}</i></tr>
              <tr><b>Institution:  </b><i>{this.state.institution}</i></tr>
              <tr><b>Organization:  </b><i>{this.state.organization}</i></tr>
              <tr><b>Chapter:  </b><i>{this.state.chapter}</i></tr>
              <tr><b>School:  </b><i>{this.state.school}</i></tr>
              <tr><b>Crossref:  </b><i>{this.state.crossref}</i></tr>
              <tr><b>Series:  </b><i>{this.state.series}</i></tr>
              <tr><b>Note:  </b><i>{this.state.note}</i></tr>
              <tr><b>Author Address:  </b><i>{this.state.authorAddress}</i></tr>
              <tr><b>Place Published:  </b><i>{this.state.placePublished}</i></tr>
              <tr><b>Keywords:  </b><i>{this.state.keywords}</i></tr>
              <tr><b>Language:  </b><i>{this.state.language}</i></tr>
              <tr><b>Number Of Volumes:  </b><i>{this.state.numberOfVolumes}</i></tr>
              <tr><b>ISBN:  </b><i>{this.state.ISBN}</i></tr>
              <tr><b>URL:  </b><i>{this.state.URL}</i></tr>
              <tr><b>Alternate Title:  </b><i>{this.state.alternateTitle}</i></tr>
              </tr>
          
            </table>
            </div>  
            <br></br> <br></br>
            <div class="col s6">
            <table>
            <div class="col s6 offset-s3">
            <tr>
            <div class="col s12 m4 l8" >
              <Link
                  to={"/edit/" + this.props.match.params.id}
                  style={{
                    width: "250px",
                    height: "60px",
                    borderRadius: "7px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                    
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >

                  EDIT DOCUMENT
                </Link>
                </div>
                <div class="col s12 m4 l2">
                <button
                  value={this.props.match.params.id}
                  onClick={this.deleteDocument}
                  style={{
                    width: "250px",
                    height: "60px",
                    borderRadius: "7px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                   
                  }}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  DELETE DOCUMENT
                </button>
                </div>
                
              </tr>
              <br></br> <br></br>
            </div>

            <div class="col s6 offset-s3">
              <tr>
              <div class="col s12 m4 l8">
                <div
                  style={{
                    width: "200px",
                    height: "120px",
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
                </div>
                <div class="col s12 m4 l2">
                <div>
                  <button
                    value={this.props.match.params.id}
                    onClick={this.downloadFile}
                    style={{
                      width: "300px",
                      height: "70px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      margin: "1rem",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable  orange darken-3"
                  >
                    DOWNLOAD
                  </button>
                </div>
                </div>
            </tr>
            <br></br> <br></br>
            </div>    

            <div class="col s6 offset-s3">
            <tr>
            <div class="col s12 m4 l8">
                <div
                  style={{
                    width: "200px",
                    height: "80px",
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
                </div>
                {/* <TextInput
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => onChangeText(text)}
                  value={value}
                  style={{ padding: 10 }}
               />*/}
               <div class="col s12 m4 l2">
                <div>
                  <button
                    value={this.props.match.params.id}
                    onClick={this.showPlain}
                    style={{
                      width: "300px",
                      height: "70px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      margin: "1rem",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable green darken-1"
                  >
                    SHOW PLAIN TEXT
                  </button>
                </div>
                </div>
              {
                //u dolu jest select do formatow cyfrowych  u gory do plaintexta
              }
              
                      <div class="container">
                        <div class="row">
                        <form class="col s12">
                          <div class="row">
                          <div class="input-field col s12" style={{
                            top: "1rem",
                            left:"20rem",
                          }}>
                              <textarea
                                id="textarea1"
                                class="materialize-textarea"
                                placeholder="Plain Text Here"
                                style={{
                                  height:"100px",
                                }}
                              ></textarea>
                               
                              <button
                                style={{
                                padding: 0,
                                border: 0,
                                float: "left",
                                width: "200px",
                                left: "8rem",
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
                        </tr>
                        </div>
        </table>

        
        </div>
      </div>
      </div>
      </div>
    );
  }
}

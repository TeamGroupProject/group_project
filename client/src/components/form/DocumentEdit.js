import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default class EditDocuments extends Component {
  constructor(props) {
    super(props);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.onChangePublisherAddress = this.onChangePublisherAddress.bind(this);
    this.onChangeEdition = this.onChangeEdition.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeEditor = this.onChangeEditor.bind(this);
    this.onChangeInstitution = this.onChangeInstitution.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeChapter = this.onChangeChapter.bind(this);
    this.onChangeSchool = this.onChangeSchool.bind(this);
    this.onChangeCrossref = this.onChangeCrossref.bind(this);
    this.onChangeSeries = this.onChangeSeries.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onChangeAuthorAddress = this.onChangeAuthorAddress.bind(this);
    this.onChangeKeywords = this.onChangeKeywords.bind(this);
    this.onChangePlacePublished = this.onChangePlacePublished.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeNumberOfVolumes = this.onChangeNumberOfVolumes.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeAlternateTitle = this.onChangeAlternateTitle.bind(this);
    this.onChangeDoi = this.onChangeDoi.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
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
      keywords: "",
      PlacePublished: "",
      language: "",
      numberOfVolumes: "",
      ISBN: "",
      URL: "",
      alternateTitle: "",
    };
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
          edition: res.data.edition,
          volume: res.data.volume,
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
          ISBN: res.data.ISBN,
          URL: res.data.URL,
          alternateTitle: res.data.alternateTitle,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePublisher(e) {
    this.setState({
      publisher: e.target.value,
    });
  }
  onChangePublisherAddress(e) {
    this.setState({
      publisherAddress: e.target.value,
    });
  }
  onChangeEdition(e) {
    this.setState({
      edition: e.target.value,
    });
  }
  onChangeVolume(e) {
    this.setState({
      volume: e.target.value,
    });
  }
  onChangeEditor(e) {
    this.setState({
      editor: e.target.value,
    });
  }
  onChangeDoi(e) {
    this.setState({
      doi: e.target.value,
    });
  }
  onChangeInstitution(e) {
    this.setState({
      institution: e.target.value,
    });
  }
  onChangeOrganization(e) {
    this.setState({
      organization: e.target.value,
    });
  }
  onChangeChapter(e) {
    this.setState({
      chapter: e.target.value,
    });
  }
  onChangeSchool(e) {
    this.setState({
      school: e.target.value,
    });
  }
  onChangeCrossref(e) {
    this.setState({
      crossref: e.target.value,
    });
  }
  onChangeSeries(e) {
    this.setState({
      series: e.target.value,
    });
  }
  onChangeNote(e) {
    this.setState({
      note: e.target.value,
    });
  }
  onChangeAuthorAddress(e) {
    this.setState({
      authorAddress: e.target.value,
    });
  }
  onChangePlacePublished(e) {
    this.setState({
      placePublished: e.target.value,
    });
  }
  onChangeKeywords(e) {
    this.setState({
      keywords: e.target.value,
    });
  }
  onChangeLanguage(e) {
    this.setState({
      language: e.target.value,
    });
  }
  onChangeNumberOfVolumes(e) {
    this.setState({
      numberOfVolumes: e.target.value,
    });
  }
  onChangeISBN(e) {
    this.setState({
      ISBN: e.target.value,
    });
  }
  onChangeURL(e) {
    this.setState({
      URL: e.target.value,
    });
  }
  onChangeAlternateTitle(e) {
    this.setState({
      alternateTitle: e.target.value,
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
      publisher: this.state.publisher,
      publisherAddress: this.state.publisherAddress,
      edition: this.state.edition,
      volume: this.state.volume,
      editor: this.state.edior,
      doi: this.state.doi,
      institution: this.state.institution,
      organization: this.state.organization,
      chapter: this.state.chapter,
      school: this.state.school,
      crossref: this.state.crossref,
      series: this.state.series,
      note: this.state.note,
      authorAddress: this.state.authorAddress,
      placePublished: this.state.placePublished,
      keywords: this.state.keywords,
      language: this.state.language,
      numberOfVolumes: this.state.numberOfVolumes,
      ISBN: this.state.ISBN,
      URL: this.state.URL,
      alternateTitle: this.state.alternateTitle,
    };
    console.log(newDocument);

    axios
      .put(
        "/document/update-document/" + this.props.match.params.id,
        newDocument
      )
      .then((res) => console.log(res.data), window.location.assign("/list"));
    this.setState({
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
    });
  }
  render() {
    const user = jwt_decode(localStorage.jwtToken);
    return (
      <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
      <div className="col s6 offset-s3">
      <div className="col s12 offset-s3" style={{ paddingLeft: "11.250px" }}>
        <h3><b>Edit Document</b></h3>
      </div>
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
            <label>Author: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
            <label>Year: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.year}
              onChange={this.onChangeYear}
            />
            <label>Month: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.month}
              onChange={this.onChangeMonth}
            />
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <label>Publisher: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangePublisher}
            />
            <label>Publisher Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisherAddress}
              onChange={this.onChangePublisherAddress}
            />
            <label>Volume: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.volume}
              onChange={this.onChangVolume}
            />
            <label>Edition: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.edition}
              onChange={this.onChangeEdition}
            />
            <label>Editor: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.editor}
              onChange={this.onChangeEditor}
            />
            <label>Doi: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.doi}
              onChange={this.onChangeDoi}
            />
            <label>Institution: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.institution}
              onChange={this.onChangeInstitution}
            />
            <label>Organization: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.organization}
              onChange={this.onChangeOrganization}
            />
            <label>Chapter: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.chapter}
              onChange={this.onChangeChapter}
            />
            <label>School: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.school}
              onChange={this.onChangeSchool}
            />
            <label>Crossref: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.crossref}
              onChange={this.onChangeCrossref}
            />
            <label>Series: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.series}
              onChange={this.onChangeSeries}
            />
            <label>Note: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={this.onChangeNote}
            />
            <label>Author Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.authorAddress}
              onChange={this.onChangeAuthorAddress}
            />
            <label>Place Published: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.placePublished}
              onChange={this.onChangePlacePublished}
            />
            <label>Keywords: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.keywords}
              onChange={this.onChangeKeywords}
            />
            <label>Language: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.language}
              onChange={this.onChangeLanguage}
            />
            <label>Number Of Volumes: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.numberOfVolumes}
              onChange={this.onChangeNumberOfVolumes}
            />
            <label>ISBN: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.ISBN}
              onChange={this.onChangeISBN}
            />
            <label>URL: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.URL}
              onChange={this.onChangeURL}
            />
            <label>Alternate Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.alternateTitle}
              onChange={this.onChangeAlternateTitle}
            />
          </div>
          <div className="col s8 offset-s4" style={{ paddingLeft: "11.250px" }}>
              <button
                  style={{
                    width: "150px",
                    borderRadius: "8px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable green darken-1"
                >
                  Edit
              </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  
    );
  }
}

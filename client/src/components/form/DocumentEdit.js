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
    this.onChangeAuthorAddress = this.onChangeAuthor.bind(this); 
    this.onChangeKeywords = this.onChangeKeywords.bind(this);
    this.onChangePlacePublished = this.onChangePlacePublished.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeNumberOfVolumes = this.onChangeNumberOfVolumes.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeAlternateTitle = this.onChangeAlternateTitle.bind(this);
    

    

    
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
      doi: e.target.e.value,
    });
  }
  onChangeInstitution(e) {
    this.setState({
      institution: e.target.e.value,
    });
  }
  onChangeOrganization(e) {
    this.setState({
      organization: e.target.e.value,
    });
  }
  onChangeChapter(e) {
    this.setState({
      chapter: e.target.e.value,
    });
  }
  onChangeSchool(e) {
    this.setState({
      school: e.target.e.value,
    });
  }
  onChangeCrossref(e) {
    this.setState({
      crossref: e.target.e.value,
    });
  }
  onChangeSeries(e) {
    this.setState({
      series: e.target.e.value,
    });
  }
  onChangeNote(e) {
    this.setState({
      note: e.target.e.value,
    });
  }
  onChangeAuthorAddress(e) {
    this.setState({
      authorAddress: e.target.e.value,
    });
  }
  onChangePlacePublished(e) {
    this.setState({
      placePublished: e.target.e.value,
    });
  }
  onChangeKeywords(e) {
    this.setState({
      keywords: e.target.e.value,
    });
  }
  onChangeLanguage(e) {
    this.setState({
      language: e.target.e.value,
    });
  }
  onChangeNumberOfVolumes(e) {
    this.setState({
      numberOfVolumes: e.target.e.value,
    });
  }
  onChangeISBN(e) {
    this.setState({
      ISBN: e.target.e.value,
    });
  }
  onChangeURL(e) {
    this.setState({
      URL: e.target.e.value,
    });
  }
  onChangeAlternateTitle(e) {
    this.setState({
      alternateTitle: e.target.e.value,
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
            <label>publisher: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangePublisher}
            />
            <label>publisher address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangePublisherAddress}
            />
            <label>volume: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.volume}
              onChange={this.onChangVolume}
            />
            <label>edition: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangPublisher}
            />
            <label>editor: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.volume}
              onChange={this.onChangEditor}
            />
            <label>doi: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.doi}
              onChange={this.onChangDoi} 
            />
            <input
              type="text"
              className="form-control"
              value={this.state.institution}
              onChange={this.onChangInstitution} 
            />
            <label>organization: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.organization}
              onChange={this.onChangeOrganization} 
            />
            <label>chapter: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.chapter}
              onChange={this.onChangeChapter} 
            />
            <label>school: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.school}
              onChange={this.onChangeSchool} 
            />
            <label>crossref: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.crossref}
              onChange={this.onChangeCrossref} 
            />
            <label>series: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.series}
              onChange={this.onChangeSeries} 
            />
            <label>note: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={this.onChangeNote} 
            />
            <label>author Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.authorAddress}
              onChange={this.onChangeAuthorAddress} 
            />
            <label>place published: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.placePublished}
              onChange={this.onChangePlacePublished} 
            />
            <label>keywords: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.keywords}
              onChange={this.onChangeKeywords} 
            />
            <label>language: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.language}
              onChange={this.onChangeLanguage} 
            />
            <label>numberOfVolumes: </label>
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
            <label>alternate Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.alternateTitle}
              onChange={this.onChangeAlternateTitle} 
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

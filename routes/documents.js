const router = require("express").Router();
jwt_decode = require("jwt-decode");
var FileReader = require("filereader"),
  reader = new FileReader();
let Document = require("../models/document");

router.route("/list").get((req, res) => {
  const userID = req.query.user;
  console.log(userID);

  Document.find({ user: userID }).then((documents) => res.send(documents));
  //console.log(documents);
  //res.send(documents);
});

router.route("/delete/:id").delete((req, res, next) => {
  Document.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

router.route("/edit-document/:id").get((req, res) => {
  Document.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update-document/:id").put((req, res, next) => {
  Document.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

router.route("/add").post((req, res) => {
  const user = req.body.user;
  const type = req.body.type;
  const author = req.body.author;
  const title = req.body.title;
  const year = req.body.year;
  const month = req.body.month;
  const email = req.body.email;
  const publisher = req.body.publisher;
  const publisherAddress = req.body.publisherAddress;
  const edition = req.body.edition;
  const volume = req.body.volume;
  const editor = req.body.editor;
  const doi = req.body.doi;
  const institution = req.body.institution;
  const organization = req.body.organization;
  const chapter = req.body.chapter;
  const school = req.body.school;
  const crossref = req.body.crossref;
  const series = req.body.series;
  const note = req.body.note;
  const authorAddress = req.body.authorAddress;
  const placePublished = req.body.placePublished;
  const keywords = req.body.keywords;
  const language = req.body.language;
  const numberOfVolumes = req.body.numberOfVolumes;
  const ISBN = req.body.ISBN;
  const URL = req.body.URL;
  const alternateTitle = req.body.alternateTitle;

  const newDocument = new Document({
    user,
    type,
    author,
    title,
    year,
    month,
    email,
    publisher,
    publisherAddress,
    edition,
    volume,
    editor,
    doi,
    institution,
    organization,
    chapter,
    school,
    crossref,
    series,
    note,
    authorAddress,
    placePublished,
    keywords,
    language,
    numberOfVolumes,
    ISBN,
    URL,
    alternateTitle,
  });

  newDocument
    .save()
    .then(() => res.json("Document added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/upload").post((req, res) => {
  const user = req.body.user;
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;
  let type, author, title;
  let newDocument = new Document({});
  //const file = e.target.files[0]; chyba nie bedzie potrzebne szczegoly do ogarniecia gdy bedzie zrobione
  const fileExtention = fileName.split(".").pop();
  newDocument.user = user;
  /////////////////// RIS ///////////////////////////////////////////
  if (fileExtention == "ris") {
    var lines = fileContent.split("\n");
    lines.forEach((line) => {
      let field = line.split("-");
      console.log(field);
      switch (field[0].trim()) {
        case "TY":
          newDocument.type = field[1];
          break;
        case "AU":
          newDocument.author = field[1];
          break;
        case "TI":
          newDocument.title = field[1];
          break;
        case "PY":
          newDocument.year = field[1];
          break;
        case "PB":
          newDocument.publisher = field[1];
          break;
        case "ET":
          newDocument.edition = field[1];
          break;
        case "VL":
          newDocument.volume = field[1];
          break;
        case "ED":
          newDocument.editor = field[1];
          break;
        case "DO":
          newDocument.doi = field[1];
          break;
        case "N1":
          newDocument.note = field[1];
          break;
        case "AD":
          newDocument.authorAddress = field[1];
          break;
        case "CY":
          newDocument.placePublished = field[1];
          break;
        case "KW":
          newDocument.keywords = field[1];
          break;
        case "LA":
          newDocument.language = field[1];
          break;
        case "NV":
          newDocument.numberOfVolumes = field[1];
          break;
        case "SN":
          newDocument.ISBN = field[1];
          break;
        case "UR":
          newDocument.URL = field[1];
          break;
        case "J2":
          newDocument.alternateTitle = field[1];
          break;
      }
    });
  }

  // year, PY
  // publisher, PB
  // edition, ET
  // volume, VL
  // editor, ED
  // doi, DO
  // note, N1
  // authorAddress, AD
  // placePublished, CY
  // keywords, KW
  // language, LA
  // numberOfVolumes, NV
  // ISBN, SN
  // URL, UR
  // alternateTitle, J2
  //////////////////////////////bibtex//////////////////////////////////////////////////////////////////

  if (fileExtention === "bib") {
    var lines = fileContent.split("\n");
    lines.pop();
    console.log(lines[0]);
    let field = lines[0].split("{");
    newDocument.type = field[0].substring(1, field[0].length);

    for (line = 1; line < lines.length; line++) {
      let field = lines[line].split("=");
      let correct = false;

      if (field[1].endsWith(",")) {
        console.log("WESZLO W ENDS WITH");
        correct = true;
      }
      let tym = 0;

      while (correct === false) {
        tym++;

        if (line + tym >= lines.length) {
          line += tym;
          break;
        }

        if (lines[line + tym].endsWith(",")) {
          correct = true;
          field[1] += " " + lines[line + tym].trim();
          line += tym;
        } else {
          field[1] += " " + lines[line + tym].trim();
        }
      }

      /////tutaj robimy substringi zeby usunac niepotrzebne znaki z konca
      field[1] = field[1].substring(0, field[1].length - 2);
      if (field[1].endsWith('"')) {
        field[1] = field[1].slice(0, -1);
      }

      field[1] = field[1].slice(2);

      ///tutaj prostsza wersja ale nie dziala zostawie na wszelki
      //if (field[1].endsWith('"') === false) {
      //  field[1] += '"';
      //}
      //field[1] = field[1].substring(
      // field[1].indexOf('"'),
      // field[1].lastIndexOf('"')
      //);

      console.log(field);
      switch (field[0].trim()) {
        case "author":
          newDocument.author = field[1];
          break;
        case "title":
          newDocument.title = field[1];
          break;
        case "publisher":
          newDocument.publisher = field[1];
          break;
        case "year":
          newDocument.year = field[1];
          break;
        case "edition":
          newDocument.edition = field[1];
          break;
        case "ISBN":
          console.log(field[1]);
          newDocument.ISBN = field[1];
          break;
        case "keywords":
          newDocument.keywords = field[1];
          break;
        case "month":
          newDocument.month = field[1];
          break;
        case "note":
          newDocument.note = field[1];
          break;
        case "institution":
          newDocument.institution = field[1];
          break;
        case "series":
          newDocument.series = field[1];
          break;
        case "organization":
          newDocument.organization = field[1];
          break;
        case "volume":
          newDocument.volume = field[1];
          break;
      }
    }
  }

  /////////////endnote///////////////////////////////////////////////////////////////////////
  if (fileExtention === "enl") {
    var lines = fileContent.split("\n");
    lines.forEach((line) => {
      let field = line.split(" ");
      field0 = field[0];
      field.splice(0, 1);
      let field1 = field.join(" ");
      console.log(field);
      switch (field0.trim()) {
        case "%0":
          newDocument.type = field1;
          break;
        case "%A":
          newDocument.author = field1;
          break;
        case "%T":
          newDocument.title = field1;
          break;
        case "%D":
          newDocument.year = field1;
          break;
        case "%I":
          newDocument.publisher = field1;
          break;
        case "%7":
          newDocument.edition = field1;
          break;
        case "%V":
          newDocument.volume = field1;
          break;
        case "%E":
          newDocument.editor = field1;
          break;
        case "%R":
          newDocument.doi = field1;
          break;
        case "%Z":
          newDocument.note = field1;
          break;
        case "%+":
          newDocument.authorAddress = field1;
          break;
        case "%C":
          newDocument.placePublished = field1;
          break;
        case "%K":
          newDocument.keywords = field1;
          break;
        case "%G":
          newDocument.language = field1;
          break;
        case "%6":
          newDocument.numberOfVolumes = field1;
          break;
        case "%@":
          newDocument.ISBN = field1;
          break;
        case "%U":
          newDocument.URL = field1;
          break;
        case "%O":
          newDocument.alternateTitle = field1;
          break;
      }
    });
  }

  // title,  %T
  // year,  %D
  // publisher,  %I
  // edition,  %7
  // volume,  %V
  // editor,  %E
  // doi,  %R
  // note, %Z
  // authorAddress, %+
  // placePublished, %C
  // keywords, %K
  // language, %G
  // numberOfVolumes, %6
  // ISBN, %@
  // URL, %U
  // alternateTitle, %O

  ///////////////  KONIEC PARSOWANIA  ////////////////////////////////////////////
  // let newDocument = new Document({});
  // if (fileExtention === "ris") {
  //   const newDocumentTem = new Document({
  //     user,
  //     type,
  //     author,
  //     title,
  //     year,
  //     publisher,
  //     edition,
  //     volume,
  //     editor,
  //     doi,
  //     note,
  //     authorAddress,
  //     placePublished,
  //     keywords,
  //     language,
  //     numberOfVolumes,
  //     ISBN,
  //     URL,
  //     alternateTitle,
  //   });
  //   newDocument = newDocumentTem;
  // }
  // if (fileExtention === "bib") {
  //   const newDocumentTem = new Document({
  //     user,
  //     type,
  //     author,
  //     title,
  //     year,
  //     month,
  //     publisher,
  //     edition,
  //     volume,
  //     institution,
  //     organization,
  //     series,
  //     note,
  //     keywords,
  //     ISBN,
  //   });
  //   newDocument = newDocumentTem;
  // }
  // if (fileExtention === "enl") {
  //   const newDocumentTem = new Document({
  //     user,
  //     type,
  //     author,
  //     title,
  //     year,
  //     publisher,
  //     edition,
  //     volume,
  //     editor,
  //     doi,
  //     note,
  //     authorAddress,
  //     placePublished,
  //     keywords,
  //     language,
  //     numberOfVolumes,
  //     ISBN,
  //     URL,
  //     alternateTitle,
  //   });
  //   newDocument = newDocumentTem;
  // }

  console.log(newDocument);

  newDocument
    .save()
    .then(() => res.json("Document added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/download/:selectedoption&:id").get((req, res, next) => {
  const citationstyle = req.params.selectedoption;
  const documentid = req.params.id;
  let document;
  Document.findById(documentid, (error, data) => {
    if (error) {
      return next(error);
    } else {
      //console.log(data);

      let text = ``;
      let name = "";

      if (citationstyle === "RIS") {
        Object.keys(data._doc).forEach(function (key) {
          //console.log(key, data[key]);
          if (data[key] !== "" && data[key] !== null) {
            switch (key) {
              case "type":
                text += `TY - ${data[key]}\n`;
                break;
              case "author":
                text += `AU - ${data[key]}\n`;
                break;
              case "title":
                text += `TI - ${data[key]}\n`;
                break;
              case "year":
                text += `PY - ${data[key]}\n`;
                break;
              case "publisher":
                text += `PB - ${data[key]}\n`;
                break;
              case "edition":
                text += `ET - ${data[key]}\n`;
                break;
              case "volume":
                text += `VL - ${data[key]}\n`;
                break;
              case "editor":
                text += `ED - ${data[key]}\n`;
                break;
              case "doi":
                text += `DO - ${data[key]}\n`;
                break;
              case "note":
                text += `N1 - ${data[key]}\n`;
                break;
              case "authorAddress":
                text += `AD - ${data[key]}\n`;
                break;
              case "placePublished":
                text += `CY - ${data[key]}\n`;
                break;
              case "keywords":
                text += `KW - ${data[key]}\n`;
                break;
              case "language":
                text += `LA - ${data[key]}\n`;
                break;
              case "numberOfVolumes":
                text += `NV - ${data[key]}\n`;
                break;
              case "ISBN":
                text += `SN - ${data[key]}\n`;
                break;
              case "URL":
                text += `UR - ${data[key]}\n`;
                break;
              case "alternateTitle":
                text += `J2 - ${data[key]}\n`;
                break;
            }
          }
        });
        text += `ER -`;
        name = `file.ris`;
        console.log(text);
      }

      if (citationstyle === "ENL") {
        Object.keys(data._doc).forEach(function (key) {
          if (data[key] !== "" && data[key] !== null) {
            switch (key) {
              case "type":
                text += `%0 ${data[key]}\n`;
                break;
              case "author":
                text += `%A ${data[key]}\n`;
                break;
              case "title":
                text += `%T ${data[key]}\n`;
                break;
              case "year":
                text += `%D ${data[key]}\n`;
                break;
              case "publisher":
                text += `%I ${data[key]}\n`;
                break;
              case "edition":
                text += `%7 ${data[key]}\n`;
                break;
              case "volume":
                text += `%V ${data[key]}\n`;
                break;
              case "editor":
                text += `%E ${data[key]}\n`;
                break;
              case "doi":
                text += `%R ${data[key]}\n`;
                break;
              case "note":
                text += `%Z ${data[key]}\n`;
                break;
              case "authorAddress":
                text += `%+ ${data[key]}\n`;
                break;
              case "keywords":
                text += `%K ${data[key]}\n`;
                break;
              case "language":
                text += `%G ${data[key]}\n`;
                break;
              case "placePublished":
                text += `%C ${data[key]}\n`;
                break;
              case "numberOfVolumes":
                text += `%6 ${data[key]}\n`;
                break;
              case "ISBN":
                text += `%@ ${data[key]}\n`;
                break;
              case "URL":
                text += `%U ${data[key]}\n`;
                break;
              case "alternateTitle":
                text += `%O ${data[key]}\n`;
                break;
            }
          }
        });

        name = `file.enl`;
        console.log(text);
      }
      if (citationstyle === "Bibtex") {
        text += `@${data._doc.type}{${data._doc.author.substring(
          0,
          3
        )}_${data._doc.title.substring(0, 3)},\n`;
        Object.keys(data._doc).forEach(function (key) {
          if (data[key] !== "" && data[key] !== null) {
            switch (key) {
              case "author":
                text += `author = "${data[key]}",\n`;
                break;
              case "title":
                text += `title = "${data[key]}",\n`;
                break;
              case "publisher":
                text += `publisher = "${data[key]}",\n`;
                break;
              case "year":
                text += `year = "${data[key]}",\n`;
                break;
              case "edition":
                text += `edition = "${data[key]}",\n`;
                break;
              case "ISBN":
                text += `ISBN = "${data[key]}",\n`;
                break;
              case "keywords":
                text += `keywords = "${data[key]}",\n`;
                break;
              case "month":
                text += `month = "${data[key]}",\n`;
                break;
              case "note":
                text += `note = "${data[key]}",\n`;
                break;
              case "institution":
                text += `institution = "${data[key]}",\n`;
                break;
              case "series":
                text += `series = "${data[key]}",\n`;
                break;
              case "organization":
                text += `organization = "${data[key]}",\n`;
                break;
              case "volume":
                text += `volume = "${data[key]}",\n`;
                break;
            }
          }
        });
        text = text.slice(0, -2);
        text += `\n`;
        text += `}`;
        name = `file.bib`;
        console.log(text);
      }

      res.status(200).attachment(name).send(text);
    }
  });
});

router.route("/showplain/:selectedoption&:id").get((req, res, next) => {
  const documentid = req.params.id;
  const plaintextstyle = req.params.selectedoption;
  Document.findById(documentid, (error, data) => {
    if (error) {
      return next(error);
    } else {
      let text = ``;
      authors = data.author.split(" ");
      i1 = authors[0][0];
      if (plaintextstyle === "IEEE") {
        text = `${i1}.${authors[1] ? authors[1] : "Braknazwiska"},${
          data.title ? data.title : ""
        },${data.edition ? data.edition : ""}. ${
          data.publisherAddress ? data.publisherAddress : ""
        }:${data.publisher ? data.publisher : ""}, ${
          data.year ? data.year : ""
        }`;
      }
      if (plaintextstyle === "APA") {
        text = `${authors[1]},${i1},(${data.year}).${data.title}.${
          data.publisher ? data.publisher : ""
        }  `;
      }
      if (plaintextstyle === "CMOS") {
        text = `${authors[1]}  ${data.title ? data.title : ""}  ${
          data.organization ? data.organization : ""
        }  ${data.year}  ${data.doi ? data.doi : ""}  `;
      }
      res.send(text);
    }
  });
});
module.exports = router;

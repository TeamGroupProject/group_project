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

  //const file = e.target.files[0]; chyba nie bedzie potrzebne szczegoly do ogarniecia gdy bedzie zrobione
  const fileExtention = fileName.split(".").pop();

  /////////////////// RIS ///////////////////////////////////////////
  if (fileExtention == "ris") {
    var lines = fileContent.split("\n");
    lines.forEach((line) => {
      let field = line.split("-");
      console.log(field);
      switch (field[0].trim()) {
        case "TY":
          type = field[1];
          break;
        case "AU":
          author = field[1];
          break;
        case "TI":
          title = field[1];
          break;
        case "PY":
          year = field[1];
          break;
        case "PB":
          publisher = field[1];
          break;
        case "ET":
          edition = field[1];
          break;
        case "VL":
          volume = field[1];
          break;
        case "ED":
          editor = field[1];
          break;
        case "DO":
          doi = field[1];
          break;
        case "N1":
          note = field[1];
          break;
        case "AD":
          authorAddress = field[1];
          break;
        case "CY":
          placePublished = field[1];
          break;
        case "KW":
          keywords = field[1];
          break;
        case "LA":
          language = field[1];
          break;
        case "NV":
          numberOfVolumes = field[1];
          break;
        case "SN":
          ISBN = field[1];
          break;
        case "UR":
          URL = field[1];
          break;
        case "J2":
          alternateTitle = field[1];
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
    type = field[0].substring(1, field[0].length);

    for (line = 1; line < lines.length - 1; line++) {
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
          author = field[1];
          break;
        case "title":
          title = field[1];
          break;
        case "publisher":
          publisher = field[1];
          break;
        case "year":
          year = field[1];
          break;
        case "edition":
          edition = field[1];
          break;
        case "ISBN":
          console.log(field[1]);
          ISBN = field[1];
          break;
        case "keywords":
          keywords = field[1];
          break;
        case "month":
          month = field[1];
          break;
        case "note":
          note = field[1];
          break;
        case "institution":
          institution = field[1];
          break;
        case "series":
          series = field[1];
          break;
        case "organization":
          organization = field[1];
          break;
        case "volume":
          volume = field[1];
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
          type = field1;
          break;
        case "%A":
          author = field1;
          break;
        case "%T":
          title = field1;
          break;
        case "%D":
          year = field1;
          break;
        case "%I":
          publisher = field1;
          break;
        case "%7":
          edition = field1;
          break;
        case "%V":
          volume = field1;
          break;
        case "%E":
          editor = field1;
          break;
        case "%R":
          doi = field1;
          break;
        case "%Z":
          note = field1;
          break;
        case "%+":
          authorAddress = field1;
          break;
        case "%C":
          placePublished = field1;
          break;
        case "%K":
          keywords = field1;
          break;
        case "%G":
          language = field1;
          break;
        case "%6":
          numberOfVolumes = field1;
          break;
        case "%@":
          ISBN = field1;
          break;
        case "%U":
          URL = field1;
          break;
        case "%O":
          alternateTitle = field1;
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
  let newDocument = new Document({});
  if (fileExtention === "ris") {
    const newDocumentTem = new Document({
      user,
      type,
      author,
      title,
      year,
      publisher,
      edition,
      volume,
      editor,
      doi,
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
    newDocument = newDocumentTem;
  }
  if (fileExtention === "bib") {
    const newDocumentTem = new Document({
      user,
      type,
      author,
      title,
      year,
      month,
      publisher,
      edition,
      volume,
      institution,
      organization,
      series,
      note,
      keywords,
      ISBN,
    });
    newDocument = newDocumentTem;
  }
  if (fileExtention === "enl") {
    const newDocumentTem = new Document({
      user,
      type,
      author,
      title,
      year,
      publisher,
      edition,
      volume,
      editor,
      doi,
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
    newDocument = newDocumentTem;
  }

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
      console.log(
        "TUTAJ TO GOWNO SIE ZACZYNA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );

      if (citationstyle === "RIS") {
        Object.keys(data._doc).forEach(function (key) {
          //console.log(key, data[key]);

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
        });
        text += `ER -`;
        name = `file.ris`;
        console.log(text);
      }

      if (citationstyle === "ENL") {
        Object.keys(data._doc).forEach(function (key) {
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
        text = `${i1}.${authors[1]},${data.title ? data.title : ""},${
          data.edition
        }. ${data.publisherAddress}:${data.publisher}, ${data.year}`;
      }
      if (plaintextstyle === "APA") {
        text = `${authors[1]},${i1},(${data.year}).${data.title}.${data.publisher}  `;
      }
      if (plaintextstyle === "CMOS") {
        `${authors[1]}  ${data.title ? data.title : ""}  ${
          data.organization
        }  ${data.year}  ${data.doi}  `;
      }
    }
  });
});
module.exports = router;

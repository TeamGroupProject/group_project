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

  const newDocument = new Document({
    user,
    type,
    author,
    title,
    year,
    month,
    email,
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
      }
    });
  }

  //////////////////////////////bibtex//////////////////////////////////////////////////////////////////

  if (fileExtention === "bib") {
    var lines = fileContent.split("\r\n");
    lines.pop();
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
      }
    });
  }

  ///////////////  KONIEC PARSOWANIA  ////////////////////////////////////////////

  const newDocument = new Document({ user, type, author, title });

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

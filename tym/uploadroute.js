const router = require("express").Router();
jwt_decode = require("jwt-decode");
let Document = require("../models/document");
import reducers from "../client/src/reducers";
import { route } from "../routes/documents";

router.route("/upload").post((req, res) => {
  const user = req.body.user;
  const file = req.body.file;
  const reader = new FileReader();
  let user, type, author, title, year, month;

  //const file = e.target.files[0]; chyba nie bedzie potrzebne szczegoly do ogarniecia gdy bedzie zrobione
  const fileExtention = file.name.split(".").pop();

  /////////////////// RIS ///////////////////////////////////////////
  if (fileExtention == "ris") {
    reader.onload = (event) => {
      const file = event.target.result;
      var lines = this.file.split("\n");
      lines.forEach((line) => {
        let field = line.split("-");
        switch (field[0]) {
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
    };
    reader.readAsText(file);
  }

  ///////////////  KONIEC PARSOWANIA  ////////////////////////////////////////////

  const newDocument = new Document({ user, type, author, title, year, month });

  newDocument
    .save()
    .then(() => res.json("Document added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

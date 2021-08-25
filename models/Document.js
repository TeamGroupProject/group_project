const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    //user

    user: {
      ///mailusera
      type: String,
      trim: true,
    },

    //rodzaj publikacji wazna rzecz potrzebna w kazdym formacie
    type: {
      type: String,
      trim: true,
      required: true,
    },
    ///////////////////////////////////////
    author: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      trim: true,
    },
    month: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    //   publisher: {
    //     type: String,
    //     trim: true,
    //   },
    //   publisherAddress: {
    //     //address wydawcy(publishera) nie  autora
    //     type: String,
    //     trim: true,
    //   },
    //   edition: {
    //     type: String,
    //     trim: true,
    //   },
    //   volume: {
    //     type: String,
    //     trim: true,
    //   },
    //   editor: {
    //     type: String,
    //     trim: true,
    //   },
    //   doi: {
    //     //diigtal object identifier pies wie co to ale pewnie wazne
    //     type: Number,
    //     trim: true,
    //   },
    //   institution: {
    //     //niekoniecznie publisher ale instytucaj ktora pomagala wydac np uniwersytet łodzki
    //     type: String,
    //     trim: true,
    //   },
    //   organization: {
    //     //sponsor konefrencji
    //     type: String,
    //     trim: true,
    //   },
    //   chapter: {
    //     type: Number,
    //     trim: true,
    //   },
    //   school: {
    //     //szkola gdzie teza byla napisana
    //     type: String,
    //     trim: true,
    //   },
    //   crossref: {
    //     //niekoniecznie publisher ale instytucaj ktora pomagala wydac np uniwersytet łodzki
    //     type: String,
    //     trim: true,
    //   },
    //   series: {
    //     type: String,
    //     trim: true,
    //   },
    //   note: {
    //     //notka/komentarz/co tam se chcesz
    //     type: String,
    //     trim: true,
    //   },

    //   //tutaj bedzie zaczynało sie to czego nie ma w biptechu a jest w risie
    //   authorAddress: {
    //     type: String,
    //     trim: true,
    //   },
    //   placePublished: {
    //     type: String,
    //     trim: true,
    //   },
    //   keywords: {
    //     type: String,
    //     trim: true,
    //   },
    //   language: {
    //     type: String,
    //     trim: true,
    //   },
    //   numberOfVolumes: {
    //     type: Number,
    //     trim: true,
    //   },
    //   note: {
    //     type: String,
    //     trim: true,
    //   },
    //   ISBN: {
    //     //oraz ISSN cokolwiek to jest
    //     type: String,
    //     trim: true,
    //   },
    //   URL: {
    //     type: String,
    //     trim: true,
    //   },

    //   //endnote
    //   alternateTitle: {
    //     type: String,
    //     trim: true,
    //   },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

const { createWriteStream } = require("fs");
const path = require("path");
const CMS = require("../models/CMS");

module.exports = {
  Query: {
    getCMS: async (_, { section }) => {
      try {
        const getTheCMS = await CMS.find({ section });

        return getTheCMS;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
      
  }
};

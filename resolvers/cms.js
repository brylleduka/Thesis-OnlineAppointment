const { createWriteStream } = require("fs");
const path = require("path");
const ContentManagement = require("../models/ContentManagement");

module.exports = {
  Query: {
    contentManagements: async (_, { section }) => {
      try {
        const getTheCMS = await ContentManagement.find({ section: section });

        return getTheCMS;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    addShowcase: async (_, { file }) => {
      try {
        const { createReadStream, filename } = await file;

        await new Promise(res =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/cms/home", filename)
            ).on("close", res)
          )
        );

        const newShowcase = new ContentManagement({
          photo: filename,
          section: "SHOWCASE",
          headline: null,
          paragraph: null
        });

        const result = await newShowcase.save();

        console.log(result);

        return true;
      } catch (err) {
        throw err;
      }
    },
    deleteShowcase: async (_, { _id }) => {
      try {
        await ContentManagement.findByIdAndDelete(_id);

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};

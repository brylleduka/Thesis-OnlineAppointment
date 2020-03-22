const { createWriteStream } = require("fs");
const path = require("path");
const ContentManagement = require("../models/ContentManagement");
const CMSAbout = require("../models/CmsAbout");

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
    },
    addCMSAboutPhoto: async (_, { bgimage }) => {
      try {
        const { createReadStream, filename } = await bgimage;

        await new Promise(res =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/cms/about", filename)
            ).on("close", res)
          )
        );
        const newAbout = new CMSAbout({
          bgimage: filename,
          title: null,
          subtitle: null,
          mission: {
            title: null,
            subtitle: null,
            photo: null
          },
          story: {
            title: null,
            subtitle: null,
            photo: null
          }
        });
        const result = await newAbout.save();

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};

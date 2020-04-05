const { createWriteStream } = require("fs");
const stream = require("stream");
const path = require("path");
const HomeCMS = require("../models/HomeCMS");

module.exports = {
  Query: {
    homeCMS: async (_, { sectionName }) => {
      try {
        const getShowcaseCMS = await HomeCMS.findOne({ sectionName });
        return getShowcaseCMS;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    updateAboutSection: async (_, { sectionName }) => {
      try {
        const aboutSect = await HomeCMS.findOne({ sectionName });
        console.log(aboutSect);

        const aboutSectionUpdate = await HomeCMS.findOneAndUpdate(
          { sectionName },
          { $set: { alt: !aboutSect.alt } },
          { new: true, upsert: true }
        );

        return aboutSectionUpdate;
      } catch (err) {
        throw err;
      }
    },
    updateHomeSection: async (
      _,
      {
        sectionName,
        inputHomeContent: {
          title,
          subtitle,
          paragraph,
          bgImg,
          bgColor,
          position,
          grid,
          dark,
          alt,
        },
      }
    ) => {
      try {
        const homeCheck = await HomeCMS.findOne({ sectionName });
        let fileImg;

        if (homeCheck) {
          fileImg = homeCheck.bgImg || "";
        } else {
          fileImg = "";
        }

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/home", filename)
              ).on("close", res)
            )
          );

          fileImg = filename;
        }

        const homeUpdate = await HomeCMS.findOneAndUpdate(
          { sectionName },
          {
            $set: {
              title,
              subtitle,
              paragraph,
              bgImg: fileImg,
              bgColor,
              position,
              dark,
              grid,
              alt,
            },
          },
          { new: true, upsert: true }
        );

        return homeUpdate;
      } catch (err) {
        throw err;
      }
    },
  },
};

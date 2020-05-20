const { createWriteStream } = require("fs");
const stream = require("stream");
const path = require("path");
const ShowcaseCMS = require("../models/ShowcaseCMS");

module.exports = {
  Query: {
    showcaseCMS: async (_, { sectionName }) => {
      try {
        const getShowcaseCMS = await ShowcaseCMS.findOne({ sectionName });
        return getShowcaseCMS;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addNewShowCase: async (
      _,
      {
        inputShowcaseContent: {
          title,
          subtitle,
          paragraph,
          bgImg,
          bgColor,
          position,
          dark,
        },
      }
    ) => {
      try {
        let fileImg = "";

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

        const showcasing = await ShowcaseCMS.findOneAndUpdate(
          { sectionName: "SHOWCASE" },
          {
            $addToSet: {
              content: {
                title,
                subtitle,
                paragraph,
                bgImg: fileImg,
                bgColor,
                position,
                dark,
              },
            },
          },
          {
            upsert: true,
            new: true,
          }
        );

        return showcasing;
      } catch (err) {
        throw err;
      }
    },
    updateShowcase: async (
      _,
      {
        showcaseId,
        inputShowcaseContent: {
          title,
          subtitle,
          paragraph,
          bgImg,
          bgColor,
          position,
          dark,
        },
      }
    ) => {
      try {
        let bgImgString = [];
        const showcaseCheck = await ShowcaseCMS.findOne(
          {
            sectionName: "SHOWCASE",
          },
          { content: { $elemMatch: { _id: showcaseId } } }
        );

        showcaseCheck.content.map((x) => {
          bgImgString.push(x.bgImg);
        });

        let fileImgUpdate = bgImgString.toString();

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/home", filename)
              ).on("close", res)
            )
          );

          fileImgUpdate = filename;
        }

        const showcase = await ShowcaseCMS.findOneAndUpdate(
          { "content._id": showcaseId },
          {
            $set: {
              "content.$.title": title,
              "content.$.subtitle": subtitle,
              "content.$.paragraph": paragraph,
              "content.$.bgImg": fileImgUpdate,
              "content.$.bgColor": bgColor,
              "content.$.position": position,
              "content.$.dark": dark,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        return showcase;
      } catch (err) {
        throw err;
      }
    },
    removeShowcase: async (_, { showcaseId }) => {
      try {
        await ShowcaseCMS.findOneAndUpdate(
          { sectionName: "SHOWCASE" },
          { $pull: { content: { _id: showcaseId } } },
          {
            new: true,
          }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};

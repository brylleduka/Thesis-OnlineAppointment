const { createWriteStream } = require("fs");
const stream = require("stream");
const path = require("path");
const HomeCMS = require("../models/HomeCMS");

module.exports = {
  Query: {
    homeCMS: async (_, { sectionName }) => {
      try {
        const getHomeCMS = await HomeCMS.findOne({ sectionName });
        return getHomeCMS;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    addNewShowCase: async (
      _,
      {
        inputHomeContent: {
          ctitle,
          csubtitle,
          cparagraph,
          bgImg,
          bgColor,
          position,
          dark
        }
      }
    ) => {
      try {
        // const showcaseExist = await HomeCMS.findOne({
        //   sectionName: "SHOWCASE"
        // });

        let fileImg = "";

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          await new Promise(res =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/home", filename)
              ).on("close", res)
            )
          );

          fileImg = filename;
        }

        const showcasing = await HomeCMS.findOneAndUpdate(
          { sectionName: "SHOWCASE" },
          {
            $addToSet: {
              content: {
                title: ctitle,
                subtitle: csubtitle,
                paragraph: cparagraph,
                bgImg: fileImg,
                bgColor,
                position,
                dark
              }
            }
          },
          {
            upsert: true,
            new: true
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
        inputHomeContent: {
          ctitle,
          csubtitle,
          cparagraph,
          bgImg,
          bgColor,
          position,
          dark
        }
      }
    ) => {
      try {
        let bgImgString = [];
        const showcaseCheck = await HomeCMS.findOne(
          {
            sectionName: "SHOWCASE"
          },
          { content: { $elemMatch: { _id: showcaseId } } }
        );

        showcaseCheck.content.map(x => {
          bgImgString.push(x.bgImg);
        });

        let fileImgUpdate = bgImgString.toString();

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          await new Promise(res =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/home", filename)
              ).on("close", res)
            )
          );

          fileImgUpdate = filename;
        }

        const showcase = await HomeCMS.findOneAndUpdate(
          { "content._id": showcaseId },
          {
            $set: {
              "content.$.title": ctitle,
              "content.$.subtitle": csubtitle,
              "content.$.paragraph": cparagraph,
              "content.$.bgImg": fileImgUpdate,
              "content.$.bgColor": bgColor,
              "content.$.position": position,
              "content.$.dark": dark
            }
          },
          {
            new: true
          }
        );

        return showcase;
      } catch (err) {
        throw err;
      }
    }
  }
};

const { createWriteStream } = require("fs");
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

        // const { createReadStream, filename } = await bgImg;

        // await new Promise(res =>
        //   createReadStream().pipe(
        //     createWriteStream(
        //       path.join(__dirname, "../images/cms/home", filename)
        //     ).on("close", res)
        //   )
        // );

        const showcasing = await HomeCMS.findOneAndUpdate(
          { sectionName: "SHOWCASE" },
          {
            $addToSet: {
              content: {
                title: ctitle,
                subtitle: csubtitle,
                paragraph: cparagraph,
                bgImg,
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
    }
  }
};

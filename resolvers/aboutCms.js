const { createWriteStream } = require("fs");
const stream = require("stream");
const path = require("path");
const AboutCMS = require("../models/AboutCMS");

module.exports = {
  Query: {
    aboutUsCMS: async (_, { contentName }) => {
      try {
        const aboutUs = await AboutCMS.findOne({ contentName });

        return aboutUs;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    updateAboutUs: async (
      _,
      {
        inputAbout: {
          title,
          subtitle,
          paragraph,
          bgImg,
          bgColor,
          dark,
          overlay
          //   mtitle,
          //   msubtitle,
          //   mparagraph,
          //   mphoto,
          //   malt,
          //   stitle,
          //   ssubtitle,
          //   sparagraph,
          //   sphoto,
          //   salt
        }
      }
    ) => {
      try {
        const about = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        let bgImgFile;
        // let sPhotoFile;
        // let mPhotoFile;

        if (about) {
          bgImgFile = about.bgImg || "";
          //   sPhotoFile = about.story.photo || "";
          //   mPhotoFile = about.mission.photo || "";
        } else {
          bgImgFile = "";
          //   sPhotoFile = "";
          //   mPhotoFile = "";
        }

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          await new Promise(res =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/about", filename)
              ).on("close", res)
            )
          );

          bgImgFile = filename;
        }

        // if (mphoto instanceof stream.Readable || mphoto) {
        //   const { createReadStream, filename: missionFileName } = await mphoto;

        //   await new Promise(res =>
        //     createReadStream().pipe(
        //       createWriteStream(
        //         path.join(__dirname, "../images/cms/about", missionFileName)
        //       ).on("close", res)
        //     )
        //   );

        //   mPhotoFile = missionFileName;
        // }

        // if (sphoto instanceof stream.Readable || sphoto) {
        //   const { createReadStream, filename: storyFileName } = await sphoto;

        //   await new Promise(res =>
        //     createReadStream().pipe(
        //       createWriteStream(
        //         path.join(__dirname, "../images/cms/about", storyFileName)
        //       ).on("close", res)
        //     )
        //   );

        //   sPhotoFile = storyFileName;
        // }

        const aboutUpdate = await AboutCMS.findOneAndUpdate(
          { contentName: "ABOUTUS" },
          {
            $set: {
              title,
              subtitle,
              paragraph,
              bgImg: bgImgFile,
              bgColor,
              dark,
              overlay
              //   story: {
              //     title: stitle,
              //     subtitle: ssubtitle,
              //     paragraph: sparagraph,
              //     photo: storyFileName ? storyFileName : "",
              //     alt: salt
              //   },
              //   mission: {
              //     title: mtitle,
              //     subtitle: msubtitle,
              //     paragraph: mparagraph,
              //     photo: missionFileName ? missionFileName : "",
              //     alt: malt
              //   }
            }
          },
          {
            new: true,
            upsert: true
          }
        );

        return aboutUpdate;
      } catch (err) {
        throw err;
      }
    }
  }
};

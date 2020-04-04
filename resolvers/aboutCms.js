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
    },
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
          overlay,
          //   mtitle,
          //   msubtitle,
          //   mparagraph,
          //   mphoto,
          //   malt,
        },
      }
    ) => {
      try {
        const about = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        let bgImgFile;

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

          await new Promise((res) =>
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
              overlay,
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
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        return aboutUpdate;
      } catch (err) {
        throw err;
      }
    },
    updateStory: async (
      _,
      { inputStory: { title, subtitle, paragraph, photo, alt } }
    ) => {
      let sPhotoFile;
      try {
        const storyContent = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        if (storyContent) {
          sPhotoFile = storyContent.story.photo || "";
        } else {
          sPhotoFile = "";
        }

        if (photo instanceof stream.Readable || photo) {
          const { createReadStream, filename } = await photo;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/about", filename)
              ).on("close", res)
            )
          );

          sPhotoFile = filename;
        }

        const storyUpdate = await AboutCMS.findOneAndUpdate(
          { contentName: "ABOUTUS" },
          {
            $set: {
              story: {
                title,
                subtitle,
                paragraph,
                photo: sPhotoFile,
                alt,
              },
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        return storyUpdate;
      } catch (err) {
        throw err;
      }
    },
    updateMission: async (
      _,
      {
        inputMissionVision: {
          mtitle,
          msubtitle,
          mparagraph,
          vtitle,
          vsubtitle,
          vparagraph,
          photo,
          alt,
        },
      }
    ) => {
      let sMissionFile;
      try {
        const missionContent = await AboutCMS.findOne({
          contentName: "ABOUTUS",
        });

        if (missionContent) {
          sMissionFile = missionContent.missionvision.photo || "";
        } else {
          sMissionFile = "";
        }

        if (photo instanceof stream.Readable || photo) {
          const { createReadStream, filename } = await photo;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/about", filename)
              ).on("close", res)
            )
          );

          sMissionFile = filename;
        }

        const missionUpdate = await AboutCMS.findOneAndUpdate(
          { contentName: "ABOUTUS" },
          {
            $set: {
              missionvision: {
                photo: sMissionFile,
                alt,
                mission: {
                  title: mtitle,
                  subtitle: msubtitle,
                  paragraph: mparagraph,
                },
                vision: {
                  title: vtitle,
                  subtitle: vsubtitle,
                  paragraph: vparagraph,
                },
              },
            },
          },
          {
            new: true,
            upsert: true,
          }
        );

        return missionUpdate;
      } catch (err) {
        throw err;
      }
    },
  },
};

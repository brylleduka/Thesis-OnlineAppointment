// const { createWriteStream, unlink, stat } = require("fs");
const stream = require("stream");
const path = require("path");
const AboutCMS = require("../models/AboutCMS");
const { handleFileUpload } = require("../utils/handleFileUpload");

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
        },
      }
    ) => {
      try {
        const about = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        // const getAboutImg = about.bgImg;

        // stat("./images/cms/about/" + getAboutImg, function (err, stats) {
        //   console.log(stats); //here we got all information of file in stats variable

        //   if (err) {
        //     return console.error(err);
        //   }

        //   unlink("./images/cms/about/" + getAboutImg, function (err) {
        //     if (err) return console.log(err);
        //     console.log("file deleted successfully");
        //   });
        // });

        let bgImgFile;
        let locationURL;

        if (about) {
          bgImgFile = about.bgImg || "";
          locationURL = about.bgImgURL || "";
        } else {
          bgImgFile = "";
          locationURL = "";
        }

        if (bgImg instanceof stream.Readable || bgImg) {
          const { filename } = await bgImg;

          // const newfile = Math.random().toString(36).substring(7) + filename;

          // await new Promise((res) =>
          //   createReadStream().pipe(
          //     createWriteStream(
          //       path.join(__dirname, "../images/cms/about", newfile)
          //     ).on("close", res)
          //   )
          // );
          const folder = "cms";

          const response = await handleFileUpload(bgImg, folder);
          locationURL = response.Location;

          bgImgFile = filename;
        }

        const aboutUpdate = await AboutCMS.findOneAndUpdate(
          { contentName: "ABOUTUS" },
          {
            $set: {
              title,
              subtitle,
              paragraph,
              bgImg: bgImgFile,
              bgImgURL: locationURL,
              bgColor,
              dark,
              overlay,
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
      try {
        let sPhotoFile;
        let locationURL;
        const storyContent = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        if (storyContent) {
          sPhotoFile = storyContent.story.photo || "";
          locationURL = storyContent.story.imageURL || "";
        } else {
          sPhotoFile = "";
          locationURL = "";
        }

        if (photo instanceof stream.Readable || photo) {
          const { filename } = await photo;

          const folder = "cms";

          const response = await handleFileUpload(photo, folder);
          locationURL = response.Location;

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
                imageURL: locationURL,
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
      try {
        let sMissionFile;
        let locationURL;
        const missionContent = await AboutCMS.findOne({
          contentName: "ABOUTUS",
        });

        if (missionContent) {
          sMissionFile = missionContent.missionvision.photo || "";
          locationURL = missionContent.missionvision.imageURL || "";
        } else {
          sMissionFile = "";
          locationURL = "";
        }

        if (photo instanceof stream.Readable || photo) {
          const { filename } = await photo;

          const folder = "cms";

          const response = await handleFileUpload(photo, folder);
          locationURL = response.Location;

          sMissionFile = filename;
        }

        const missionUpdate = await AboutCMS.findOneAndUpdate(
          { contentName: "ABOUTUS" },
          {
            $set: {
              missionvision: {
                photo: sMissionFile,
                imageURL: locationURL,
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

const { createWriteStream, unlink, stat } = require("fs");
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
        },
      }
    ) => {
      try {
        const about = await AboutCMS.findOne({ contentName: "ABOUTUS" });

        const getAboutImg = about.bgImg;

        stat("./images/cms/about/" + getAboutImg, function (err, stats) {
          console.log(stats); //here we got all information of file in stats variable

          if (err) {
            return console.error(err);
          }

          unlink("./images/cms/about/" + getAboutImg, function (err) {
            if (err) return console.log(err);
            console.log("file deleted successfully");
          });
        });

        let bgImgFile;

        if (about) {
          bgImgFile = about.bgImg || "";
        } else {
          bgImgFile = "";
        }

        if (bgImg instanceof stream.Readable || bgImg) {
          const { createReadStream, filename } = await bgImg;

          const newfile = Math.random().toString(36).substring(7) + filename;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/cms/about", newfile)
              ).on("close", res)
            )
          );

          bgImgFile = newfile;
        }

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

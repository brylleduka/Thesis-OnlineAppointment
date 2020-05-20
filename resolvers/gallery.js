const { createWriteStream } = require("fs");
const path = require("path");

const Gallery = require("../models/Gallery");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    galleries: async (_, { active }) => {
      try {
        const getAllGallery = await Gallery.find({ active }).sort({
          updatedaAt: -1,
        });

        if (getAllGallery === undefined) return;

        return getAllGallery;
      } catch (err) {
        throw err;
      }
    },
    gallery: async (_, { _id, active }) => {
      try {
        const getGallery = await Gallery.findOne({ _id, active });
        if (getGallery === undefined) return;

        return getGallery;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addGallery: async (_, { title }) => {
      try {
        const newGallery = new Gallery({
          title,
          active: true,
          photos: [],
        });

        const gallerySave = newGallery.save();

        return gallerySave;
      } catch (err) {
        throw err;
      }
    },
    addGalleryPhoto: async (_, { _id, image }) => {
      try {
        const randNum1 = Math.random() * 2 + 3;
        const randNum2 = Math.random() * 2 + 3;

        let process_upload = async (upload) => {
          let { filename, createReadStream } = await upload;

          const newfile = Math.random().toString(36).substring(7) + filename;

          await new Promise((res) =>
            createReadStream().pipe(
              createWriteStream(
                path.join(__dirname, "../images/gallery", newfile)
              ).on("close", res)
            )
          );

          const newPhoto = await Gallery.updateMany(
            { _id },
            {
              $addToSet: {
                photos: {
                  name: newfile.replace(/\.[^/.]+$/, ""),
                  src: newfile,
                  height: randNum1,
                  width: randNum2,
                },
              },
            },
            { new: true, upsert: true }
          );

          return newPhoto;
        };

        await Promise.all(image.map(process_upload));
      } catch (err) {
        throw err;
      }
    },
  },
};

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

        if (getAllGallery === undefined) throw new UserInputError("Not Found");

        return getAllGallery;
      } catch (err) {
        throw err;
      }
    },
    gallery: async (_, { _id, active }) => {
      try {
        const getGallery = await Gallery.findOne({ _id, active });
        if (getGallery === undefined) throw new UserInputError("Not Found");

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
    addGalleryPhoto: async (_, { _id, caption, image }) => {
      try {
        const randNum = Math.floor(Math.random() * 2) + 3;
        const { createReadStream, filename } = await image;

        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/gallery", filename)
            ).on("close", res)
          )
        );

        const newPhoto = await Gallery.findByIdAndUpdate(
          _id,
          {
            $addToSet: {
              photos: {
                name: filename,
                caption,
                image: filename,
                height: randNum,
                width: randNum,
              },
            },
          },
          { new: true, upsert: true }
        );

        return newPhoto;
      } catch (err) {
        throw err;
      }
    },
  },
};

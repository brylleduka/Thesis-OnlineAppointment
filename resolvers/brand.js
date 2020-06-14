const Brand = require("../models/Brand");

const { UserInputError, ForbiddenError } = require("apollo-server-express");
const Auth = require("../utils/check-auth");

const { createWriteStream, unlink, stat } = require("fs");

const path = require("path");

module.exports = {
  Query: {
    brands: async () => {
      try {
        const fetchBrands = await Brand.find();

        if (fetchBrands < 1 || fetchBrands === null) return;

        return fetchBrands;
      } catch (err) {
        throw err;
      }
    },
    brand: async (_, { _id }) => {
      try {
        const fetchBrand = await Brand.findById(_id);

        return fetchBrand;
      } catch (err) {
        throw err;
      }
    },
    brandActive: async () => {
      try {
        const fetchBrandActive = await Brand.findOne({ active: true });

        return fetchBrandActive;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addBrand: async (_, { image }) => {
      try {
        const { createReadStream, filename } = await image;
        const newfile = Math.random().toString(36).substring(7) + filename;

        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/brands", newfile)
            ).on("close", res)
          )
        );

        const newBrand = new Brand({
          image: newfile,
          active: false,
        });

        const brandSave = newBrand.save();

        return brandSave;
      } catch (err) {
        throw err;
      }
    },
    updateActiveBrand: async (_, { _id }) => {
      try {
        const checkActive = await Brand.findOne({ active: true });

        if (checkActive) {
          await Brand.updateOne({ active: true }, { $set: { active: false } });
        }

        const updateStatus = await Brand.findOneAndUpdate(
          { _id },
          { $set: { active: true } },
          { new: true }
        );

        return updateStatus;
      } catch (err) {
        throw err;
      }
    },

    deleteBrand: async (_, { _id }) => {
      const brand = await Brand.findById(_id);
      const getImg = brand.image;

      stat("./images/brands/" + getImg, function (err, stats) {
        console.log(stats); //here we got all information of file in stats variable

        if (err) {
          return console.error(err);
        }

        unlink("./images/brands/" + getImg, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });

      await Brand.findByIdAndDelete(_id);

      return true;
    },
  },
};

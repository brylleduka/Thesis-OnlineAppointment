const { handleFileUpload } = require("../utils/handleFileUpload");
const stream = require("stream");
const Promotion = require("../models/Promotion");

module.exports = {
  Query: {
    promotions: async () => {
      try {
        const getPromotions = await Promotion.find().sort({ createdAt: -1 });

        return getPromotions;
      } catch (err) {
        throw err;
      }
    },
    promotionActives: async (_, { active }) => {
      try {
        const getPromotionActives = await Promotion.find({ active }).sort({
          createdAt: -1,
        });

        return getPromotionActives;
      } catch (err) {
        throw err;
      }
    },
    promotion: async (_, { _id }) => {
      try {
        const getPromotion = await Promotion.findById(_id);
        return getPromotion;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createPromotion: async (
      _,
      { title, subtitle, description, photo, bgColor }
    ) => {
      const { filename } = await photo;

      const folder = "cms";

      const response = await handleFileUpload(photo, folder);

      const newPromotion = new Promotion({
        title,
        subtitle,
        description,
        photo: filename,
        imageURL: response.Location,
        bgColor,
        active: true,
      });

      const result = newPromotion.save();
      return result;
    },
  },
};

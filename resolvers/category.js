const Category = require("../models/Category");
const Service = require("../models/Service");
const Employee = require("../models/Employee");
const { createWriteStream } = require("fs");
const path = require("path");

module.exports = {
  Query: {
    categories: async (_, { active }) => {
      try {
        const getAllCategories = await Category.find({ active }).sort({
          updatedAt: -1,
        });
        return getAllCategories;
      } catch (err) {
        throw err;
      }
    },
    category: async (_, { _id }) => {
      try {
        const getCategory = await Category.findById(_id);
        if (getCategory) {
          return getCategory;
        } else {
          throw new Error("Category Not Found");
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createCategory: async (_, { categoryInput }) => {
      try {
        const newCategory = new Category({
          name: categoryInput.name,
          description: categoryInput.description,
          active: true,
        });

        const saved = await newCategory.save();

        return saved;
      } catch (err) {
        throw err;
      }
    },

    updateCategory: async (_, { _id, name, description }) => {
      try {
        let updateCateg = {};

        if (name) {
          updateCateg.name = name;
        }
        if (description) {
          updateCateg.description = description;
        }

        const updated = await Category.findByIdAndUpdate(_id, updateCateg, {
          new: true,
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },

    addCategoryPhoto: async (_, { _id, file }) => {
      try {
        const { createReadStream, filename } = await file;
        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/service", filename)
            ).on("close", res)
          )
        );

        const category = await Category.updateOne(
          { _id },
          { $set: { photo: filename } },
          { new: true, upsert: true }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
    archivedCategory: async (_, { _id }) => {
      try {
        const archivedService = await Category.findOneAndUpdate(
          { _id },
          { $set: { active: false } },
          { new: true }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },

    deleteCategory: async (_, { _id }) => {
      try {
        const services = await Service.find({ category: _id });

        await services.map(async (service) => {
          await Employee.updateMany({}, { $pull: { services: service._id } });
        });
        await Service.deleteMany({ category: _id });
        await Category.findByIdAndDelete(_id);

        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};

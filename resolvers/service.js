const { UserInputError } = require("apollo-server-express");
const Service = require("../models/Service");
const Category = require("../models/Category");
const Employee = require("../models/Employee");
const { validateServiceInput } = "../utils/validators";
const { createWriteStream } = require("fs");
const path = require("path");

module.exports = {
  Query: {
    services: async (_, { categoryId }) => {
      const services = await Service.find({ category: categoryId });

      return services;
    },
    allServices: async () => {
      try {
        const services = await Service.find();

        return services;
      } catch (err) {
        throw err;
      }
    },
    service: async (_, { _id }) => {
      try {
        const service = await Service.findById(_id);

        return service;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createService: async (
      _,
      { serviceInput: { name, price, duration, description, categoryId } }
    ) => {
      try {
        // const { valid, errors } = validateServiceInput(name, duration, price);
        let errors = {};
        const category = await Category.findById(categoryId);
        const serviceExist = await Service.findOne({ name });

        if (!category) {
          throw new Error("Category not exist");
        }

        if (serviceExist) {
          errors.serviceExist = "Service exist already";
          throw new UserInputError("Service already exist", {
            errors
          });
        }

        const newService = await new Service({
          name,
          price,
          duration, //MINUTES
          description,
          category: categoryId
        });

        const savedService = await newService.save();

        await category.services.push(newService);
        await category.save();

        let createdService = { ...savedService._doc };

        return createdService;
      } catch (err) {
        throw err;
      }
    },
    updateService: async (_, { _id, name, price, duration, description }) => {
      try {
        let updateService = {};

        if (name) {
          updateService.name = name;
        }
        if (price) {
          updateService.price = price;
        }
        if (duration) {
          updateService.duration = duration;
        }
        if (description) {
          updateService.description = description;
        }

        const updated = await Service.findByIdAndUpdate(_id, updateService, {
          new: true
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },

    deleteService: async (_, { _id }) => {
      try {
        await Employee.updateMany({}, { $pull: { services: _id } });
        await Category.updateMany({}, { $pull: { services: _id } });
        const deleted = await Service.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw err;
      }
    },
    addServicePhoto: async (_, { _id, file }) => {
      try {
        const { createReadStream, filename } = await file;
        await new Promise(res =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/service", filename)
            ).on("close", res)
          )
        );

        await Service.updateOne({ _id }, { $set: { photo: filename } });

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};

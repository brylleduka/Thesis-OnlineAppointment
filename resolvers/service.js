const { UserInputError } = require("apollo-server-express");
const Service = require("../models/Service");
const Category = require("../models/Category");
const Employee = require("../models/Employee");
const { validateServiceInput } = "../utils/validators";
const { createWriteStream, unlink, stat } = require("fs");
const path = require("path");

module.exports = {
  Query: {
    services: async (_, { categoryId, active }) => {
      const services = await Service.find({ category: categoryId, active });

      return services;
    },
    allServices: async (_, { active }) => {
      try {
        const allservices = await Service.find({ active });

        return allservices;
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
    },
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
            errors,
          });
        }

        const newService = await new Service({
          name,
          price,
          duration, //MINUTES
          description,
          active: true,
          category: categoryId,
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
          new: true,
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },

    archivedService: async (_, { _id, active }) => {
      try {
        const updatedService = await Service.findOneAndUpdate(
          { _id },
          { $set: { active } },
          { new: true, upsert: true }
        );

        return updatedService;
      } catch (err) {
        throw err;
      }
    },

    deleteService: async (_, { _id }) => {
      try {
        const service = await Service.findById(_id);
        const getServiceImg = service.photo;

        stat("./images/service/" + getServiceImg, function (err, stats) {
          console.log(stats); //here we got all information of file in stats variable

          if (err) {
            return console.error(err);
          }

          unlink("./images/service/" + getServiceImg, function (err) {
            if (err) return console.log(err);
            console.log("file deleted successfully");
          });
        });

        await Employee.updateMany({}, { $pull: { services: _id } });
        await Category.updateMany({}, { $pull: { services: _id } });
        await Service.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw err;
      }
    },
    addServicePhoto: async (_, { _id, file }) => {
      try {
        const service = await Service.findById(_id);
        const getServiceImg = service.photo;

        stat("./images/service/" + getServiceImg, function (err, stats) {
          console.log(stats); //here we got all information of file in stats variable

          if (err) {
            return console.error(err);
          }

          unlink("./images/service/" + getServiceImg, function (err) {
            if (err) return console.log(err);
            console.log("file deleted successfully");
          });
        });

        const { createReadStream, filename } = await file;

        const newfile = Math.random().toString(36).substring(7) + filename;

        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(
              path.join(__dirname, "../images/service", newfile)
            ).on("close", res)
          )
        );

        await Service.updateOne(
          { _id },
          { $set: { photo: newfile } },
          { new: true, upsert: true }
        );

        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};

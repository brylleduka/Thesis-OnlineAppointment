const Contact = require("../models/Contact");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    contact: async () => {
      try {
        const contactInfo = await Contact.find();

        if (contactInfo !== undefined || contactInfo !== null)
          return contactInfo;

        return console.log("empty");
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addContact: async (_, { address, lat, lng, mapKey, phone, mobile }) => {
      try {
        const newContact = await new Contact({
          address,
          lat,
          lng,
          mapKey,
          phone,
          mobile,
        });

        const result = await newContact.save();

        return result;
      } catch (err) {
        throw err;
      }
    },
    updateContact: async (
      _,
      { _id, address, lat, lng, mapKey, phone, mobile }
    ) => {
      try {
        let updateContact = {};
        const checkContactExist = await Contact.findById(_id);

        if (!checkContactExist)
          throw new UserInputError("Contact Does not exist");

        if (address) {
          updateEmployee.address = address;
        }
        if (lat) {
          updateContact.lat = lat;
        }

        if (lng) {
          updateContact.lng = lng;
        }

        if (mapKey) {
          updateContact.mapKey = mapKey;
        }
        if (phone) {
          updateContact.phone = phone;
        }

        if (mobile) {
          updateContact.mobile = mobile;
        }

        const updated = await Contact.findByIdAndUpdate(_id, updateContact, {
          new: true,
          upsert: true,
        });

        return updated;
      } catch (err) {
        throw err;
      }
    },
  },
};

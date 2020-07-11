const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
// const cookieParser = require("cookie-parser");
require("dotenv").config();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

//MIDDLEWARE
const app = express();

// MONGODB CONNECTION
const uri = process.env.MONGODB_URI;

//MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

// if (process.env.NODE_ENV === "production") {
//   app.use((req, res, next) => {
//     if (req.header("x-forwarded-proto") !== "https")
//       res.redirect(`https://${req.header("host")}${req.url}`);
//     else next();
//   });
// }

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});

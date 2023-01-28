const mongoose = require("mongoose"),
  config = require("../index");
mongoose.set({ strictQuery: false })
const connect = () => {
  mongoose
    .connect(config.db.url)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("An error occured while connecting to the database!");
      console.log(err);
    });
};

module.exports = connect;

const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/dezire-notebook";

const connectToMongo = () => {
  mongoose.connect(mongoUri, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Conntected to MongoDB");
    }
  });
};
module.exports = connectToMongo;

const mongoose = require("mongoose");

function ConnectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected To DB");
  });
}

module.exports = ConnectToDB;

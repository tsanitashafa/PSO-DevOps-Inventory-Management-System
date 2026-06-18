const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "";

console.log("PORT =", process.env.PORT);
console.log(
  "MONGO_URI =",
  uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@")
);

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB connection failed:");
    console.error(err);
    process.exit(1);
  });
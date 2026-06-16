require("dotenv").config({ path: ".env.test", override: true });

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret";

const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 0);

jest.setTimeout(30000);

afterEach(() => {
  jest.clearAllMocks();
});
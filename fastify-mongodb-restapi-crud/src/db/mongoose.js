const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/test")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

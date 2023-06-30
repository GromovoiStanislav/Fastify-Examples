const mongoose = require("mongoose");

const url = "mongodb://localhost/test"
const options = {useUnifiedTopology: true, useNewUrlParser: true}

mongoose
    .connect(url, options)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log(err));

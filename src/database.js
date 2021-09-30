const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/ejchat")
  .then(() => {
    console.log("Base de Datos Mongoose conectada");
  })
  .catch((err) => console.log(err));

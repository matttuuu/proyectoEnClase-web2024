const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI, {})
  .then(() => console.log(" Mongoose: base de datos conectada "))
  .catch((e) => console.log(" Hubo un error: " + e));

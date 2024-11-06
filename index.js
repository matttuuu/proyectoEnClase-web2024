const express = require("express");
// recibo las configutraciones de express handlebars
const { create } = require("express-handlebars");
// se leen la variables de entorno
require("dotenv").config();
// conexión a la base de datos
require("./database/conexion");
const app = express();
// cambio la extension de los archivos handlebars y especifico parciales
const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});
// configuro el motor de planillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

// permite servir archivos estáticos
app.use(express.static(__dirname + "/public"));
// permite leer cuerpo de solicitud
app.use(express.urlencoded({ extended: true }));
// configuro las rutas
app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("servidor andando " + PORT));

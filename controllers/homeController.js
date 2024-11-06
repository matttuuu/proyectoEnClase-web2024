const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const leerUrl = async (req, res) => {
  try {
    const urls = await Url.find().lean();
    res.render("home", { titulo: "Página de inicio", urls });
  } catch (error) {
    console.log(error);
  }
};

const agregarUrl = async (req, res) => {
  const { origin } = req.body;

  const url = new Url({ origin: origin, shortURL: nanoid(8) });
  try {
    await url.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

//eliminar
const eliminarUrl = async (req, res) => {
  try {
    // tomo el parámetro
    const { id } = req.params;
    await Url.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("algo falló");
  }
};

//editar url en el Formulario
const editarUrlForm = async (req, res) => {
  // tomo el parámetro
  const { id } = req.params;
  try {
    const urlDB = await Url.findById(id).lean();
    //console.log(urlDB);
    //vuelvo a renderizar home y envío el objeto
    res.render("home", { urlDB });
  } catch (error) {
    console.log(error);
    res.send("algo falló");
  }
};

//actualizar BBDD
const editarUrl = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.body;
  try {
    await Url.findByIdAndUpdate(id, { origin: origin });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// redireccionamiento a url original
const redireccionamiento = async (req, res) => {
  const { shortURL } = req.params;
  try {
    const urlDB = await Url.findOne({ shortURL: shortURL });
    res.redirect(urlDB.origin);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  leerUrl,
  agregarUrl,
  eliminarUrl,
  editarUrl,
  editarUrlForm,
  redireccionamiento,
};

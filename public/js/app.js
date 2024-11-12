document.addEventListener("click", (e) => {
  if (e.target.dataset.short) {
    const url = `https://proyecto-web-handlebars.onrender.com/${e.target.dataset.short}`;
    //A la hora de hacer el deploy, cambiar la url por la direccion provista por el host

    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Texto copiado...");
      })
      .catch((err) => {
        console.log("Hubo un error: ", err);
      });
  }
});

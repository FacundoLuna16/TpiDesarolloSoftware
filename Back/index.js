const express = require("express");
const morgan = require("morgan");

// routes import
const peliculasRoutes = require("./routes/peliculas");
const seriesRoutes = require("./routes/series");
const climasRoutes = require("./routes/climas");
const jugadoresRoutes = require("./routes/jugadores");

const app = express();
require("./base-ORM/sqlite-init.js");

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Configuracion de CORS
// configurar servidor
const cors = require("cors");
app.use(cors({
  origin: '*'    // origin: 'https://dds-frontend.azurewebsites.net'
}));


// routes
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/climas", climasRoutes);
app.use("/api/jugadores", jugadoresRoutes);


if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing




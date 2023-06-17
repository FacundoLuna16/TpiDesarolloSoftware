// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/recursos.db");
// definicion del modelo de datos


const series = sequelize.define('series', {
  IdSerie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Titulo: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  Director: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Anio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  CantTemporadas: {
    type: DataTypes.INTEGER
  },
  Episodios: {
    type: DataTypes.INTEGER
  }
},
{
  // pasar a mayusculas
  hooks: {
    beforeValidate: function (series, options) {
      if (typeof series.Titulo === "string") {
        series.Titulo = series.Titulo.toUpperCase();
      }
    },
  },

  timestamps: false,
}
);


const peliculas = sequelize.define('peliculas', {
  IdPelicula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  director: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    }
  }
},
{timestamps: false});


const climas = sequelize.define('climas', {
  IdClima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Maxima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 50
    }
  },
  Minima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: -50
    }
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Lluvia: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Humedad: {
    type: DataTypes.INTEGER,
    allowNull: false,
}
},
{timestamps: false});


const jugadores = sequelize.define('jugadores', {
  idJugador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  eloMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1000
    }
  },
  fechaEloMax: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
},
{timestamps: false});

module.exports = {
  series,
  sequelize,
  peliculas,
  climas,
  jugadores
};

// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    await db.open("./.data/recursos.db");

    let existe = false;
    let res = null;

    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",[]);

    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
        "CREATE table peliculas( IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT,titulo text NOT NULL UNIQUE, director text NOT NULL, year DATE NOT NULL, rating INTEGER CHECK (rating >= 0 AND rating <= 10));"
        );
        console.log("tabla Peliculas creada!");

        await db.run(
            `INSERT INTO peliculas (titulo, director, year, rating) VALUES
            ('El Padrino', 'Francis Ford Coppola', '1972-03-24', 9),
            ('La lista de Schindler', 'Steven Spielberg', '1993-12-15', 8),
            ('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', '2003-12-01', 10),
            ('Forrest Gump', 'Robert Zemeckis', '1994-07-06', 7),
            ('El caballero de la noche', 'Christopher Nolan', '2008-07-18', 9),
            ('Star Wars: Episodio IV - Una Nueva Esperanza', 'George Lucas', '1977-05-25', 8),
            ('El silencio de los corderos', 'Jonathan Demme', '1991-02-14', 9),
            ('Pulp Fiction', 'Quentin Tarantino', '1994-09-23', 8),
            ('Volver al futuro', 'Robert Zemeckis', '1985-07-03', 7),
            ('Los siete samuráis', 'Akira Kurosawa', '1954-04-26', 10);`);
    }

    existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'series'",[]);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run("CREATE table series( IdSerie INTEGER PRIMARY KEY AUTOINCREMENT, Titulo text NOT NULL UNIQUE,Director text NOT NULL, Anio DATE NOT NULL ,CantTemporadas INT, Episodios INT);");
    console.log("tabla Series creada!");
    await db.run(
        `INSERT INTO series (Titulo, Director, Anio, CantTemporadas, Episodios) VALUES 
        ('Juego de Tronos', 'David Benioff y D. B. Weiss', '2011-04-17', 8, 73),
        ('Breaking Bad', 'Vince Gilligan', '2008-01-20', 5, 62),
        ('Friends', 'David Crane y Marta Kauffman', '1994-09-22', 10, 236),
        ('Stranger Things', 'The Duffer Brothers', '2016-07-15', 4, 34),
        ('The Crown', 'Peter Morgan', '2016-11-04', 4, 40),
        ('Narcos', 'Chris Brancato, Carlo Bernard y Doug Miro', '2015-08-28', 3, 30),
        ('House of Cards', 'Beau Willimon', '2013-02-01', 6, 73),
        ('Orange Is the New Black', 'Jenji Kohan', '2013-07-11', 7, 91),
        ('The Big Bang Theory', 'Chuck Lorre y Bill Prady', '2007-09-24', 12, 279),
        ('The Walking Dead', 'Frank Darabont', '2010-10-31', 11, 177);`
    );
  }


  existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'climas'",[]);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run("CREATE table climas( IdClima INTEGER PRIMARY KEY AUTOINCREMENT, Maxima INT NOT NULL, Minima INT NOT NULL, Fecha DATE NOT NULL, Lluvia text NOT NULL, Humedad INT NOT NULL);");
    console.log("tabla Climas creada!");
    await db.run(
        `INSERT INTO climas (Maxima, Minima, Fecha, Lluvia, Humedad) VALUES 
        (33, 23, '2022-04-17', 'SI', 55),
        (42, 32, '2022-01-20', 'SI', 44),
        (27, 17, '2021-09-22', 'NO', 33),
        (28, 15, '2016-07-15', 'SI', 22),
        (24, 10, '2018-11-04', 'NO', 11),
        (35, 22, '2019-08-28', 'NO', 66),
        (27, 21, '2022-02-01', 'NO', 77),
        (30, 24, '2023-07-11', 'SI', 88),
        (20, 11, '2017-09-24', 'NO', 55),
        (29, 20, '2019-10-31', 'NO', 33);`
    );
  }


  existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'",[]);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run("CREATE table jugadores( idJugador INTEGER PRIMARY KEY AUTOINCREMENT, nombre text NOT NULL UNIQUE, pais text NOT NULL, fechaNacimiento DATE NOT NULL, eloMax INT NOT NULL, fechaEloMax DATE NOT NULL);");
    console.log("tabla Jugadores creada!");
    await db.run(
        `INSERT INTO jugadores (Nombre, Pais, FechaNacimiento, EloMax, FechaEloMax) VALUES 
        ('Magnus Carlsen', 'Noruega', '1990-11-30', 2882, '2014-05-01'),
        ('Ding Liren', 'China', '1992-10-24', 2816, '2018-11-01'),
        ('Garri Kaspárov', 'Rusia', '1963-04-13', 2851, '1999-07-01'),
        ('Vishwanathan Anand', 'India', '1969-12-11', 2817, '2011-03-01'),
        ('Robert Fischer', 'Estados Unidos', '1943-03-09', 2785, '1972-07-01'),
        ('Fabiano Caruana', 'Estados Unidos', '1992-07-30', 2844, '2014-10-01'),
        ('Ian Nepomniachtchi', 'Rusia', '1990-07-14', 2795, '2023-03-01'),
        ('Alireza Firouzja', 'Francia', '2003-06-18', 2804, '2021-12-01'),
        ('Vladimir Kramnik', 'Rusia', '1975-06-25', 2817, '2016-10-01'),
        ('Richárd Rapport', 'Rumania', '1996-03-25', 2776, '2022-04-01');`
    );
  }



    // cerrar la base
    db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
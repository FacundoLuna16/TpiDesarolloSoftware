const request = require("supertest");
const app = require("../index")

function generarNombreAleatorio() {
    const nombres = ["Juan", "María", "Pedro", "Ana", "Luis", "Laura", "Carlos", "Sofía", "Miguel", "Isabella"];
    const apellidos = ["González", "Rodríguez", "López", "Martínez", "Gómez", "Pérez", "Hernández", "Sánchez", "Fernández", "Torres"];
    
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    
    return nombre + " " + apellido;
}

function generarPaisAleatorio() {
    const paises = ["España", "Francia", "Italia", "Alemania", "Estados Unidos", "Canadá", "México", "Argentina", "Brasil", "China"];
    
    const indiceAleatorio = Math.floor(Math.random() * paises.length);
    const paisAleatorio = paises[indiceAleatorio];
    
    return paisAleatorio;
}

function generarFechasAleatorias() {
    const fechaInicial = new Date(1980, 0, 1); // Fecha mínima: 1 de enero de 1950
    const fechaFinal = new Date(); // Fecha actual
  
    const añoMinimo = fechaInicial.getFullYear();
    const anioMaximo = fechaFinal.getFullYear() - 20;
  
    const año1 = Math.floor(Math.random() * (anioMaximo - añoMinimo + 1)) + añoMinimo;
    const mes1 = Math.floor(Math.random() * 12) + 1;
    const dia1 = Math.floor(Math.random() * 28) + 1;
  
    const fecha1 = new Date(año1, mes1 - 1, dia1);
  
    const año2 = Math.floor(Math.random() * (fechaFinal.getFullYear() + 1 - (año1 + 20))) + (año1 + 20);
    const mes2 = Math.floor(Math.random() * 12) + 1;
    const dia2 = Math.floor(Math.random() * 28) + 1;
  
    const fecha2 = new Date(año2, mes2 - 1, dia2);
  
    const fechaNacimiento = fecha1.toISOString().split("T")[0];
    const fechaEloMax = fecha2.toISOString().split("T")[0];
  
    return [fechaNacimiento, fechaEloMax];
}

const fechas1 = generarFechasAleatorias()
const fechas2 = generarFechasAleatorias()

const jugadorAlta = {
    nombre: generarNombreAleatorio(),
    pais : generarPaisAleatorio(),
    fechaNacimiento : fechas1[0],
    eloMax : aleatorio(2800, 2700),
    fechaEloMax : fechas1[1]
};

const jugadorModificado = {
    nombre: "Juan Pablo Montoya",
    pais : "Colombia",
    fechaNacimiento : "1975-11-20",
    eloMax : 2734,
    fechaEloMax : "2002-08-01" 
};

const jugadorEliminar = {
    nombre: generarNombreAleatorio(),
    pais : generarPaisAleatorio(),
    fechaNacimiento : fechas2[0],
    eloMax : aleatorio(2800, 2700),
    fechaEloMax : fechas2[1]
};

function aleatorio(max, min) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}

describe("GET /api/jugadores", () => {
    it("debería devolver todos los jugadores", async () => {
        const res = await request(app).get("/api/jugadores")
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idJugador: expect.any(Number),
                    nombre: expect.any(String),
                    pais : expect.any(String),
                    fechaNacimiento : expect.any(String),
                    eloMax : expect.any(Number),
                    fechaEloMax : expect.any(String)
                }),
            ])
        );
    });
});

describe("GET /api/jugador/:id", () => {
    it("debería devolver un jugador", async () => {
        const res = await request(app)
        .get("/api/jugadores/1")
        .set("Accept", "application/json");
        expect(res.headers["content-type"]).toEqual(
          "application/json; charset=utf-8"
        );
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            item: {
            idJugador: expect.any(Number),
            nombre: expect.any(String),
            pais: expect.any(String),
            fechaNacimiento: expect.any(String),
            eloMax: expect.any(Number),
            fechaEloMax: expect.any(String)
            },
        });
    });
});  
  
describe("POST /api/jugadores", () => {
    it("debería crear un jugador y mostrarlo para luego insertarlo en la BD", async () => {
        console.log("Jugador CREADO:", jugadorAlta);
        const res = await request(app).post("/api/jugadores").send(jugadorAlta);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais : expect.any(String),
                fechaNacimiento : expect.any(String),
                eloMax : expect.any(Number),
                fechaEloMax : expect.any(String)
            }),
        );
    });
});

describe("PUT /api/jugadores/:id", () => {
    it("debería modificar un jugador y mostrar sus cambios", async () => {
        console.log("ID del Jugador a modificar: ", 1);
        console.log("Jugador MODIFICADO:", jugadorModificado);
        const res = await request(app).put("/api/jugadores/1").send(jugadorModificado);
        expect(res.status).toEqual(200);
        /* expect(res.body).toEqual({
            item: {
                idJugador: expect.any(Number),
                nombre: expect.any(String),
                pais: expect.any(String),
                fechaNacimiento: expect.any(String),
                eloMax: expect.any(Number),
                fechaEloMax: expect.any(String)
            },
        }); */
    });
});

describe("DELETE /api/jugadores/:id", () => {
    it("debería eliminar un jugador y mostrarlo antes de eliminarlo", async () => {
        // Cada vez que se testea se crea un jugador nuevo para insertarlo en la BD
        // y posteriormente eliminarlo, para no comprometer la integridad de la BD
        const resP = await request(app).post("/api/jugadores").send(jugadorEliminar);
        const id = resP.body.idJugador;

        console.log("Jugador a eliminar:", jugadorEliminar);
        console.log("ID del jugador a eliminar:", id);

        const res = await request(app).delete("/api/jugadores/" + id);;
        expect(res.status).toEqual(200);
    });
});
import React, { useState} from "react";
import moment from "moment";
import SeriesBuscar from "./SeriesBuscar";
import SeriesListado from "./SeriesListado";
import SeriesRegistro from "./SeriesRegistro";
import { seriesService } from "../../services/series.service";



function Series() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");
  

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
 

  async function Buscar() {
    const data = await seriesService.Buscar(Titulo);
    console.log(data);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await seriesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdSeries: 0,
      Titulo: null,
      Director: null,
      Anio: moment(new Date()).format("YYYY-MM-DD"),
      CantTemporadas: null,
      Episodios: null,
       });
  }
  async function Eliminar(item) {
     const resp = window.confirm(
       "Esta seguro que quiere ELIMINAR el registro?"
     );
     if (resp) {
         await seriesService.Eliminar(item.IdSerie);
         Buscar();
     }
  }


  async function Grabar(item) {
    // agregar o modificar
    await seriesService.Grabar(item);
    await Buscar();
    Volver();
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Series <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <SeriesBuscar
          Titulo={Titulo}
          setTitulo={setTitulo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <SeriesListado
          {...{
            Items,
            Consultar,
            Eliminar,
            Modificar,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <SeriesRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Series };

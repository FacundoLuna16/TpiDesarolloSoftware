import React from "react";
import moment from "moment";


export default function ArticulosListado({
  Items,
  Consultar,
  Eliminar,
  Modificar,
  Buscar
}) {
  
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Titulo</th>
            <th className="text-center">Director</th>
            <th className="text-center">Año</th>
            <th className="text-center">Cantidad De Temporadas</th>
            <th className="text-center">Episodios</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdSerie}>
                <td className="text-end" >{Item.Titulo}</td>
                <td className="text-end" >{Item.Director}</td>
                <td className="text-end" >{moment(Item.anio).format("DD/MM/YYYY")}</td>
                <td className="text-end" >{Item.CantTemporadas}</td>
                <td className="text-end" >{Item.Episodios}</td>
                <td className="text-center text-nowrap" >
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil "></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>  
    </div>
  );
}

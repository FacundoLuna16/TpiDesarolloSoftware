import React from "react";
import moment from "moment";


export default function PeliculasListado ({
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
            <th className="text-center">Rating</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdPelicula}>
                <td className="text-end" >{Item.titulo}</td>
                <td className="text-end" >{Item.director}</td>
                <td className="text-end" >{moment(Item.year).format("DD/MM/YYYY")}</td>
                <td className="text-end" >{Item.rating}</td>
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

import { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";


const Tablausuarios = ({ usuarios, cargado }) => {
    const [orden, setOrden] = useState({ campo: "id_usuarios", direccion: "asc" });


    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const usuariosOrdenadas = [...usuarios].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    if (cargado)
        return (
            <>

                <Spinner animation="borde" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>

        );
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <BotonOrden campo="id_usuario" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>

                        <BotonOrden campo="nombre_usuario" orden={orden} manejarOrden={manejarOrden}>
                            Nombre usuario
                        </BotonOrden>

                        <BotonOrden campo="descripcion_usuario" orden={orden} manejarOrden={manejarOrden}>
                            Descripción usuario
                        </BotonOrden>

                        <th>Acciones</th>
                    </tr>

                </thead>
                <tbody>
                    {usuariosOrdenadas.map((usuario) => {

                        return (
                            <tr key={usuarios.id_usuario}>
                                <td> {usuarios.id_usuario}</td>
                                <td> {usuarios.nombre_usuario}</td>
                                <td> {usuarios.contraseña}</td>
                                <td>Accion</td>
                            </tr>
                        );
                    })}


                </tbody>
            </Table >
        </>
    );
}
export default Tablausuarios;
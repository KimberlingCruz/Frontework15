import { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";


const TablaCompras = ({ compras, cargando, abrirModalEdicion, abrirModalEliminacion, totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual
}) => {
    const [orden, setOrden] = useState({ campo: "id_compra", direccion: "asc" });

    // 🔁 Alternar orden asc/desc
    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    // 📊 Ordenar las compras según el campo seleccionado
    const comprasOrdenadas = [...compras].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    // ⏳ Mostrar spinner mientras carga
    if (cargando) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    // 🧾 Tabla principal
    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <BotonOrden campo="id_compra" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>
                        <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
                            ID Empleado
                        </BotonOrden>
                        <BotonOrden campo="fecha_compra" orden={orden} manejarOrden={manejarOrden}>
                            Fecha Compra
                        </BotonOrden>
                        <BotonOrden campo="total_compra" orden={orden} manejarOrden={manejarOrden}>
                            Total Compra
                        </BotonOrden>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasOrdenadas.map((compra) => (
                        <tr key={compra.id_compra}>
                            <td>{compra.id_compra}</td>
                            <td>{compra.id_empleado}</td>
                            <td>{compra.fecha_compra}</td>
                            <td>{compra.total_compra}</td>
                            <td>
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => abrirModalEdicion(compra)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => abrirModalEliminacion(compra)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginacion
                elementosPorPagina={elementosPorPagina}
                totalElementos={totalElementos}
                paginaActual={paginaActual}
                establecerPaginaActual={establecerPaginaActual}
            />
        </>
    );
};

export default TablaCompras;

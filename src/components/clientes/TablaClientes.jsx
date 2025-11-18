import { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaClientes = ({ clientes, cargando, abrirModalEdicion, abrirModalEliminacion }) => {
    const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });

    // 🔁 Alternar el orden ascendente/descendente
    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    // 📊 Ordenar los clientes según el campo seleccionado
    const clientesOrdenados = [...clientes].sort((a, b) => {
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

    // 🧾 Tabla de clientes
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
                        ID
                    </BotonOrden>
                    <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
                        Primer Nombre
                    </BotonOrden>
                    <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
                        Segundo Nombre
                    </BotonOrden>
                    <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
                        Primer Apellido
                    </BotonOrden>
                    <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
                        Segundo Apellido
                    </BotonOrden>
                    <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
                        Celular
                    </BotonOrden>
                    <BotonOrden campo="direccion" orden={orden} manejarOrden={manejarOrden}>
                        Dirección
                    </BotonOrden>
                    <BotonOrden campo="cedula" orden={orden} manejarOrden={manejarOrden}>
                        Cédula
                    </BotonOrden>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {clientesOrdenados.map((cliente) => (
                    <tr key={cliente.id_cliente}>
                        <td>{cliente.id_cliente}</td>
                        <td>{cliente.primer_nombre}</td>
                        <td>{cliente.segundo_nombre}</td>
                        <td>{cliente.primer_apellido}</td>
                        <td>{cliente.segundo_apellido}</td>
                        <td>{cliente.celular}</td>
                        <td>{cliente.direccion}</td>
                        <td>{cliente.cedula}</td>
                        <td>
                            <Button
                                variant="outline-warning"
                                size="sm"
                                className="me-2"
                                onClick={() => abrirModalEdicion(cliente)}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => abrirModalEliminacion(cliente)}
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaClientes;

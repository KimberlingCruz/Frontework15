import { useState } from "react";
import { Table, Spinner, Image, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaProductos = ({
    productos,
    cargando,
    abrirModalEdicion,
    abrirModalEliminacion,
}) => {
    const [orden, setOrden] = useState({ campo: "id_producto", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const productosOrdenados = [...productos].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];
        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }
        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    if (cargando)
        return (
            <div className="text-center my-3">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="align-middle text-center">
                <thead>
                    <tr>
                        <BotonOrden campo="id_producto" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>
                        <BotonOrden campo="nombre_producto" orden={orden} manejarOrden={manejarOrden}>
                            Nombre Producto
                        </BotonOrden>
                        <BotonOrden campo="descripcion_producto" orden={orden} manejarOrden={manejarOrden}>
                            Descripción
                        </BotonOrden>
                        <BotonOrden campo="id_categoria" orden={orden} manejarOrden={manejarOrden}>
                            ID Categoría
                        </BotonOrden>
                        <BotonOrden campo="precio_unitario" orden={orden} manejarOrden={manejarOrden}>
                            Precio
                        </BotonOrden>
                        <BotonOrden campo="stock" orden={orden} manejarOrden={manejarOrden}>
                            Stock
                        </BotonOrden>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productosOrdenados.map((producto) => (
                        <tr key={producto.id_producto}>
                            <td>{producto.id_producto}</td>
                            <td>{producto.nombre_producto}</td>
                            <td>{producto.descripcion_producto}</td>
                            <td>{producto.id_categoria}</td>
                            <td>{producto.precio_unitario}</td>
                            <td>{producto.stock}</td>
                            <td className="text-center">
                                {producto.imagen ? (
                                    <div
                                        style={{
                                            width: "100%",
                                            maxWidth: "70px",
                                            aspectRatio: "1 / 1",
                                            overflow: "hidden",
                                            borderRadius: "10px",
                                            margin: "0 auto",
                                            backgroundColor: "#d1d2d1ff",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            src={producto.imagen}
                                            alt={producto.nombre_producto}
                                            fluid
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain", // 🔥 muestra toda la imagen sin recortar
                                                borderRadius: "10px",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <span className="text-muted">Sin imagen</span>
                                )}
                            </td>
                            <td>
                                <div className="d-grid gap-1 d-md-flex justify-content-center">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="w-100 w-md-auto"
                                        onClick={() => abrirModalEdicion(producto)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-100 w-md-auto"
                                        onClick={() => abrirModalEliminacion(producto)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TablaProductos;
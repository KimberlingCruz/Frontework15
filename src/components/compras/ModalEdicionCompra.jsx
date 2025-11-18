import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCompra = ({
    mostrar,
    setMostrar,
    compraEditada,
    setCompraEditada,
    guardarEdicion,
}) => {
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setCompraEditada((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <Modal
            backdrop="static"
            show={mostrar}
            onHide={() => setMostrar(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="id_empleado">
                        <Form.Label>ID Empleado</Form.Label>
                        <Form.Control
                            type="text"
                            name="id_empleado"
                            value={compraEditada?.id_empleado || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: ID 1"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fecha_compra">
                        <Form.Label>Fecha Compra</Form.Label>
                        <Form.Control
                            type="text"
                            name="fecha_compra"
                            value={compraEditada?.fecha_compra || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: dd/mm/aaaa"
                            maxLength={20}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="total_compra">
                        <Form.Label>Total Compra</Form.Label>
                        <Form.Control
                            type="text"
                            name="total_compra"
                            value={compraEditada?.total_compra || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: 1000.00"
                            maxLength={20}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={guardarEdicion}
                    disabled={!compraEditada?.id_empleado?.toString().trim()}
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );


};

export default ModalEdicionCompra;

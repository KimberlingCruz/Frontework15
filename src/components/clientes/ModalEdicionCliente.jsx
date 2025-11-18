import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCliente = ({
    mostrar,
    setMostrar,
    clienteEditada,
    setClienteEditada,
    guardarEdicion,
}) => {
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setClienteEditada((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>

            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="primer_nombre">
                        <Form.Label>Nombre 1 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={clienteEditada?.primer_nombre}
                            onChange={manejarCambio}
                            placeholder="Ej: Enrique"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="segundo_nombre">
                        <Form.Label>Nombre 2 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_nombre"
                            value={clienteEditada?.segundo_nombre}
                            onChange={manejarCambio}
                            placeholder="Ej: Manuel"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="primer_apellido">
                        <Form.Label>Apellido 1 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_apellido"
                            value={clienteEditada?.primer_apellido}
                            onChange={manejarCambio}
                            placeholder="Ej: Hernández"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="segundo_apellido">
                        <Form.Label>Apellido 2 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_apellido"
                            value={clienteEditada?.segundo_apellido}
                            onChange={manejarCambio}
                            placeholder="Ej: Martínez"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Telefono del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={clienteEditada?.celular}
                            onChange={manejarCambio}
                            placeholder="Ej: 8538****"
                            maxLength={8}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="direccion"
                            value={clienteEditada?.direccion}
                            onChange={manejarCambio}
                            placeholder="Descripción opcional (máx. 100 caracteres)"
                            maxLength={150}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cedula">
                        <Form.Label>Cedula del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={clienteEditada?.cedula}
                            onChange={manejarCambio}
                            placeholder="Ej: 121******1005V"
                            maxLength={16}
                            required
                            autoFocus
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
                    disabled={!clienteEditada?.primer_nombre.trim()}
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionCliente;

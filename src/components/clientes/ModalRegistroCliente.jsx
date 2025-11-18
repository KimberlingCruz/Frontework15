import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
}) => {
  return (
    <Modal  backdrop = "static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
  
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
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Enrique"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="segundo_nombre">
            <Form.Label>Nombre 2 del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Manuel"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="primer_apellido">
            <Form.Label>Apellido 1 del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Hernández"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="segundo_apellido">
            <Form.Label>Apellido 2 del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Martínez"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Telefono del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 8538****"
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Descripción opcional (máx. 100 caracteres)"
              maxLength={150}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cedula">
            <Form.Label>Cedula del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: 121******1005V"
              maxLength={16}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarCliente}
          
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;

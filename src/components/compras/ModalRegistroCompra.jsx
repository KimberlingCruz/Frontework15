import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  manejarCambioInput,
  agregarCompra,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id_empleado">
            <Form.Label>ID del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="id_empleado"
              value={nuevaCompra.id_empleado}
              onChange={manejarCambioInput}
              placeholder="Ej: EMP001"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha_compra">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fecha_compra"
              value={nuevaCompra.fecha_compra}
              onChange={manejarCambioInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="total_compra">
            <Form.Label>Total de la Compra</Form.Label>
            <Form.Control
              type="number"
              name="total_compra"
              value={nuevaCompra.total_compra}
              onChange={manejarCambioInput}
              placeholder="Ej: 1500.00"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCompra}>
          Guardar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;

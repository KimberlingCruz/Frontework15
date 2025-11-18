import { Modal, Button } from "react-bootstrap";

const ModalEliminacionProducto = ({
  mostrar,
  setMostrar,
  productoEliminado,   // Recomiendo usar este nombre más claro
  confirmarEliminacion,
}) => {
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-2">
          ¿Estás seguro de que deseas <strong>eliminar el producto</strong>
          <br />
          <strong className="text-primary">
            "{productoEliminado?.nombre_producto || "este producto"}"
          </strong>
          ?
        </p>
        <p className="text-muted small mb-0">
          Esta acción <strong>no se puede deshacer</strong>.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Sí, Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionProducto;
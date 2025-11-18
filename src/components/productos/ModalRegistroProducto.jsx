import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  setNuevoProducto,
  agregarProducto,
}) => {
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto((prev) => ({
          ...prev,
          imagen: reader.result, // Guardamos la imagen en Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombre_producto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Cajas"
              maxLength={20} // Según tu tabla
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion_producto">
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: 4x4 chapa 14"
              maxLength={100} // Según tu tabla
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="id_categoria">
            <Form.Label>ID Categoría</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={nuevoProducto.id_categoria}
              onChange={manejarCambioInput}
              placeholder="Ej: 1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precio_unitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio_unitario"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioInput}
              placeholder="Ej: 500"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock Disponible</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambioInput}
              placeholder="Ej: 90"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={manejarImagen} />
          </Form.Group>

          {nuevoProducto.imagen && (
            <div className="text-center mb-3">
              <img
                src={nuevoProducto.imagen}
                alt="Vista previa"
                style={{ width: "150px", borderRadius: "5px" }}
              />
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarProducto}>
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;

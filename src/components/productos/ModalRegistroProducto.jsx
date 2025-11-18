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
          imagen: reader.result, // Guarda como Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto *</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Martillo, Cemento, Pintura..."
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Martillo de garra 16oz, marca Truper"
              maxLength={200}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>ID Categoría *</Form.Label>
                <Form.Control
                  type="number"
                  name="id_categoria"
                  value={nuevoProducto.id_categoria}
                  onChange={manejarCambioInput}
                  placeholder="Ej: 1"
                  min="1"
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio Unitario *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="precio_unitario"
                  value={nuevoProducto.precio_unitario}
                  onChange={manejarCambioInput}
                  placeholder="0.00"
                  min="0"
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Stock Disponible *</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={nuevoProducto.stock}
                  onChange={manejarCambioInput}
                  placeholder="Ej: 100"
                  min="0"
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Imagen del Producto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={manejarImagen}
                />
                <Form.Text className="text-muted">
                  Opcional • Máximo 5MB recomendado
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          {/* Vista previa de la imagen seleccionada */}
          {nuevoProducto.imagen && (
            <div className="text-center my-4">
              <img
                src={nuevoProducto.imagen}
                alt="Vista previa del producto"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "280px", border: "3px solid #28a745" }}
              />
              <p className="text-success mt-2 fw-bold">Imagen lista para guardar</p>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={agregarProducto}
          disabled={
            !nuevoProducto.nombre_producto.trim() ||
            !nuevoProducto.id_categoria ||
            !nuevoProducto.precio_unitario ||
            !nuevoProducto.stock
          }
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoEditado((prev) => ({
          ...prev,
          imagen: reader.result, // Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      backdrop="static"
      show={mostrar}
      onHide={() => setMostrar(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto *</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={productoEditado?.nombre_producto || ""}
              onChange={manejarCambio}
              placeholder="Ej: Martillo 16oz"
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto || ""}
              onChange={manejarCambio}
              placeholder="Detalles del producto..."
              maxLength={200}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio Unitario *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="precio_unitario"
                  value={productoEditado?.precio_unitario || ""}
                  onChange={manejarCambio}
                  placeholder="0.00"
                  min="0"
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Stock Actual *</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={productoEditado?.stock || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: 25"
                  min="0"
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Cambiar Imagen del Producto</Form.Label>
            <Form.Control
              type="file" accept="image/*" onChange={manejarImagen} />
            <Form.Text className="text-muted">
              Deja vacío si no deseas cambiar la imagen actual
            </Form.Text>
          </Form.Group>

          {productoEditado?.imagen && (
            <div className="text-center mb-3">
              <img
                src={productoEditado.imagen}
                alt="Vista previa del producto"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "250px", border: "2px solid #ddd" }}
              />
              <p className="text-muted mt-2 small">Imagen actual</p>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={guardarEdicion}
          disabled={!productoEditado?.nombre_producto?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
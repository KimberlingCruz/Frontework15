import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";

// Dependencias para PDF y Excel
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Íconos
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

// Fondo
const fondoFerreteria =
  "https://i.pinimg.com/1200x/02/b0/43/02b043af51095195be4e910dad3cf54b.jpg";

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    id_categoria: "",
    precio_unitario: "",
    stock: "",
    imagen: "",
  });

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [productoAEliminado, setProductoAEliminado] = useState(null);

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
    } catch (error) {
      console.error(error.message);
      alert("Error al cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (p) =>
        p.nombre_producto.toLowerCase().includes(texto) ||
        p.descripcion_producto.toLowerCase().includes(texto)
    );
    setProductosFiltrados(filtrados);
  };

  // Nuevo producto
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto.trim()) {
      alert("El nombre del producto es obligatorio");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/registrarProducto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error("Error al guardar");

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
      });
      setMostrarModal(false);
      await obtenerProductos();
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el producto.");
    }
  };

  // Edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!productoEditado?.nombre_producto.trim()) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/actualizarProductos/${productoEditado.id_producto}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoEditado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar");

      setMostrarModalEdicion(false);
      await obtenerProductos();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el producto.");
    }
  };

  // Eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoAEliminado(producto);
    setMostrarModalEliminacion(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/eliminarProducto/${productoAEliminado.id_producto}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setMostrarModalEliminacion(false);
      setProductoAEliminado(null);
      await obtenerProductos();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto.");
    }
  };

  // PDF Lista completa
  const generarPDFProductos = () => {
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";

    // Cabecera verde
    doc.setFillColor(40, 167, 69);
    doc.rect(14, 10, 182, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Lista de Productos", 105, 20, { align: "center" });

    const encabezados = [["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"]];
    const datos = productos.map((p) => [
      p.id_producto,
      p.nombre_producto,
      p.descripcion_producto,
      p.id_categoria,
      `$${parseFloat(p.precio_unitario).toFixed(2)}`,
      p.stock,
    ]);

    doc.autoTable({
      head: encabezados,
      body: datos,
      startY: 35,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [40, 167, 69], textColor: 255, fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 50 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
      },
      didDrawPage: (data) => {
        let str = `Página ${data.pageCount}`;
        if (typeof doc.putTotalPages === "function") {
          str += ` de ${totalPagesExp}`;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
      },
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    doc.save(`Productos_${fecha}.pdf`);
  };

  // PDF Detalle de un producto (corregido el problema de carga asíncrona de imagen)
  const generarPDFDetalleProducto = async (producto) => {
    const doc = new jsPDF();

    doc.setFillColor(40, 167, 69);
    doc.rect(14, 10, 182, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Detalle del Producto", 105, 20, { align: "center" });

    let y = 40;
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`ID: ${producto.id_producto}`, 20, y); y += 10;
    doc.text(`Nombre: ${producto.nombre_producto}`, 20, y); y += 10;
    doc.text(`Descripción: ${producto.descripcion_producto}`, 20, y); y += 10;
    doc.text(`Categoría ID: ${producto.id_categoria}`, 20, y); y += 10;
    doc.text(`Precio: $${parseFloat(producto.precio_unitario).toFixed(2)}`, 20, y); y += 10;
    doc.text(`Stock: ${producto.stock}`, 20, y); y += 20;

    // Imagen (con manejo correcto de carga)
    if (producto.imagen && producto.imagen.trim() !== "") {
      try {
        const img = await new Promise((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error("Error cargando imagen"));
          image.src = producto.imagen;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg", 0.8);
        doc.addImage(imgData, "JPEG", 20, y, 80, 60);
      } catch (err) {
        console.warn("No se pudo cargar la imagen:", err);
      }
    }

    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    doc.save(`Producto_${producto.id_producto}_${fecha}.pdf`);
  };

  // Excel
  const exportarExcelProductos = () => {
    const datos = productos.map((p) => ({
      ID: p.id_producto,
      Nombre: p.nombre_producto,
      Descripción: p.descripcion_producto,
      Categoría: p.id_categoria,
      Precio: parseFloat(p.precio_unitario),
      Stock: p.stock,
    }));

    const ws = XLSX.utils.json_to_sheet(datos);
    ws["!cols"] = [
      { wch: 8 }, { wch: 25 }, { wch: 40 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    saveAs(data, `Productos_${fecha}.xlsx`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${fondoFerreteria})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "auto",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <div
          className="p-4 rounded-4 shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.67)",
            maxWidth: "1100px",
            width: "100%",
            border: "3px solid #28a745",
            borderRadius: "20px",
            backdropFilter: "blur(8px)",
          }}
        >
          <h4 className="text-center mb-4 fw-bold text-success">
            Registro de Productos
          </h4>

          <Row className="mb-3 align-items-center">
            <Col lg={6} md={6} sm={12} className="mb-2 mb-md-0">
              <CuadroBusquedas
                textoBusqueda={textoBusqueda}
                manejarCambioBusqueda={manejarCambioBusqueda}
              />
            </Col>
            <Col lg={6} md={6} sm={12} className="text-end">
              <div className="d-flex justify-content-end gap-2 flex-wrap">
                <Button
                  variant="success"
                  size="sm"
                  className="fw-bold px-3 shadow-sm d-flex align-items-center"
                  onClick={generarPDFProductos}
                >
                  <FaFilePdf className="me-1" /> PDF
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="fw-bold px-3 shadow-sm d-flex align-items-center"
                  onClick={exportarExcelProductos}
                >
                  <FaFileExcel className="me-1" /> Excel
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="fw-bold px-3 shadow-sm d-flex align-items-center"
                  onClick={() => setMostrarModal(true)}
                >
                  + Nuevo
                </Button>
              </div>
            </Col>
          </Row>

          <div className="table-responsive" style={{ maxHeight: "60vh" }}>
            <TablaProductos
              productos={productosFiltrados}
              cargando={cargando}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              generarPDFDetalleProducto={generarPDFDetalleProducto}
            />
          </div>

          {/* Modales */}
          <ModalRegistroProducto
            mostrarModal={mostrarModal}
            setMostrarModal={setMostrarModal}
            nuevoProducto={nuevoProducto}
            setNuevoProducto={setNuevoProducto}
            manejarCambioInput={manejarCambioInput}
            agregarProducto={agregarProducto}
          />

          <ModalEdicionProducto
            mostrar={mostrarModalEdicion}
            setMostrar={setMostrarModalEdicion}
            productoEditado={productoEditado}
            setProductoEditado={setProductoEditado}
            guardarEdicion={guardarEdicion}
          />

          <ModalEliminacionProducto
            mostrar={mostrarModalEliminacion}
            setMostrar={setMostrarModalEliminacion}
            productoEliminado={productoAEliminado}
            confirmarEliminacion={confirmarEliminacion}
          />
        </div>
      </Container>
    </div>
  );
};

export default Producto;
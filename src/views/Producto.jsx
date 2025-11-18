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
  "https://i.pinimg.com/736x/c2/eb/b2/c2ebb246e634d6050eb9dcd5cf8c57b1.jpg";

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

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
  const [productoAEliminado, setProductoEliminado] = useState(null);

  // Obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Buscar productos
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

  // Manejar inputs de nuevo producto
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar nuevo producto
  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto.trim()) return;
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

  // Abrir modal de edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  // Guardar cambios del producto editado
  const guardarEdicion = async () => {
    if (!productoEditado.nombre_producto.trim()) return;
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

  // Abrir modal de eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoEliminado(producto);
    setMostrarModalEliminacion(true);
  };

  // Confirmar eliminación
  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/eliminarProducto/${productoAEliminado.id_producto}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar");
      setMostrarModalEliminacion(false);
      setProductoEliminado(null);
      await obtenerProductos();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto.");
    }
  };

  // GENERAR PDF DE TODOS LOS PRODUCTOS
  const generarPDFProductos = () => {
    const doc = new jsPDF();

    // Título con fondo verde
    doc.setFillColor(40, 167, 69);
    doc.rect(14, 10, 182, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Lista de Productos", 105, 20, { align: "center" });

    // Encabezados de tabla
    const encabezados = [["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"]];

    // Datos de filas
    const datos = productos.map((p) => [
      p.id_producto,
      p.nombre_producto,
      p.descripcion_producto,
      p.id_categoria,
      `$${parseFloat(p.precio_unitario).toFixed(2)}`,
      p.stock,
    ]);

    // Marcador de página total
    let totalPagesExp = "{total_pages_count_string}";

    // Configuración de tabla
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
          str = `${str} de ${totalPagesExp}`;
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

  // GENERAR PDF DE DETALLE DE UN PRODUCTO
  const generarPDFDetalleProducto = (producto) => {
    const doc = new jsPDF();

    doc.setFillColor(40, 167, 69);
    doc.rect(14, 10, 182, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(`Detalle del Producto`, 105, 20, { align: "center" });

    let y = 40;
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`ID: ${producto.id_producto}`, 20, y);
    y += 10;
    doc.text(`Nombre: ${producto.nombre_producto}`, 20, y);
    y += 10;
    doc.text(`Descripción: ${producto.descripcion_producto}`, 20, y);
    y += 10;
    doc.text(`Categoría ID: ${producto.id_categoria}`, 20, y);
    y += 10;
    doc.text(`Precio: $${parseFloat(producto.precio_unitario).toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Stock: ${producto.stock}`, 20, y);

    if (producto.imagen && producto.imagen.trim() !== "") {
      try {
        const img = new Image();
        img.src = producto.imagen;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL("image/jpeg", 0.8);
          doc.addImage(imgData, "JPEG", 20, y + 10, 80, 60);
          doc.save(`Producto_${producto.id_producto}_${new Date().toLocaleDateString("es-ES").replace(/\//g, "-")}.pdf`);
        };
        img.onerror = () => {
          doc.save(`Producto_${producto.id_producto}_${new Date().toLocaleDateString("es-ES").replace(/\//g, "-")}.pdf`);
        };
      } catch (err) {
        doc.save(`Producto_${producto.id_producto}_${new Date().toLocaleDateString("es-ES").replace(/\//g, "-")}.pdf`);
      }
    } else {
      doc.save(`Producto_${producto.id_producto}_${new Date().toLocaleDateString("es-ES").replace(/\//g, "-")}.pdf`);
    }
  };

  // GENERAR EXCEL DE TODOS LOS PRODUCTOS
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
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");

    const colWidths = [
      { wch: 8 }, { wch: 25 }, { wch: 40 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
    ];
    ws["!cols"] = colWidths;

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    saveAs(data, `Productos_${fecha}.xlsx`);
  };

  // INTERFAZ
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
        style={{
          minHeight: "100vh",
          padding: "20px",
        }}
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
                  style={{ minWidth: "110px" }}
                >
                  <FaFilePdf className="me-1" /> PDF
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="fw-bold px-3 shadow-sm d-flex align-items-center"
                  onClick={exportarExcelProductos}
                  style={{ minWidth: "110px" }}
                >
                  <FaFileExcel className="me-1" /> Excel
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="fw-bold px-3 shadow-sm d-flex align-items-center"
                  onClick={() => setMostrarModal(true)}
                  style={{ minWidth: "110px" }}
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

          {/* MODALES */}
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
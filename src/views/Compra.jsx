import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaCompras from "../components/compras/TablaCompras";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCompra from "../components/compras/ModalRegistroCompra";
import ModalEdicionCompra from "../components/compras/ModalEdicionCompra";
import ModalEliminacionCompra from "../components/compras/ModalEliminacionCompra";

const Compra = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [compraFiltrados, setCompraFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: "",
    fecha_compra: "",
    total_compra: "",
  });

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; 

  // Calcular compras paginadas
  const comprasPaginadas = compraFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [compraEditada, setCompraEditada] = useState(null);
  const [compraAEliminar, setCompraAEliminar] = useState(null);

  // 🔹 Obtener compras desde el backend
  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/compras");
      if (!respuesta.ok) throw new Error("Error al obtener las compras");
      const datos = await respuesta.json();
      setCompras(datos);
      setCompraFiltrados(datos);
    } catch (error) {
      console.error(error.message);
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Buscar por texto
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = compras.filter(
      (c) =>
        c.id_empleado.toString().includes(texto) ||
        c.fecha_compra.toString().includes(texto)
    );
    setCompraFiltrados(filtrados);
  };

  // 🔹 Modal de edición
  const abrirModalEdicion = (compra) => {
    setCompraEditada({ ...compra });
    setMostrarModalEdicion(true);
  };

  // 🔹 Guardar edición
  const guardarEdicion = async () => {
    if (!compraEditada || !compraEditada.id_compra) {
      alert("❗ No hay compra seleccionada para actualizar.");
      return;
    }

    const { id_empleado, fecha_compra, total_compra } = compraEditada;

    if (!id_empleado || !fecha_compra || !total_compra) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }

    // 🧩 Convertir fecha ISO -> YYYY-MM-DD
    const fechaSQL = new Date(fecha_compra).toISOString().split("T")[0];

    const datosActualizar = {
      id_empleado: parseInt(id_empleado),
      fecha_compra: fechaSQL,
      total_compra: parseFloat(total_compra),
    };

    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/actualizarCompra/${compraEditada.id_compra}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosActualizar),
        }
      );

      const data = await respuesta.json();
      if (!respuesta.ok) {
        console.error("Detalles del error:", data);
        throw new Error(data.mensaje || "Ha ocurrido un error al actualizar la compra.");
      }

      await obtenerCompras();
      setMostrarModalEdicion(false);
      setCompraEditada(null);
      console.log("✅ Compra actualizada correctamente.");
    } catch (error) {
      console.error("Error al editar Compra:", error);
      alert(`No se pudo actualizar la compra: ${error.message}`);
    }
  };

  // 🔹 Modal de eliminación
  const abrirModalEliminacion = (compra) => {
    setCompraAEliminar(compra);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    if (!compraAEliminar) return;
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/eliminarCompra/${compraAEliminar.id_compra}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar la compra.");
      setMostrarModalEliminar(false);
      setCompraAEliminar(null);
      await obtenerCompras();
    } catch (error) {
      console.error("Error al eliminar Compra:", error);
      alert("No se pudo eliminar la compra.");
    }
  };

  // 🔹 Manejo de inputs del formulario
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCompra((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Registrar nueva compra
  const agregarCompra = async () => {
    const { id_empleado, fecha_compra, total_compra } = nuevaCompra;

    if (!id_empleado || !fecha_compra || !total_compra) {
      console.warn("❗ Faltan campos obligatorios en el formulario.");
      return;
    }

    if (isNaN(id_empleado)) {
      console.warn("❗ El ID del empleado debe ser un número válido.");
      return;
    }

    const fechaSQL = new Date(fecha_compra).toISOString().split("T")[0];

    const datosCompra = {
      id_empleado: parseInt(id_empleado),
      fecha_compra: fechaSQL,
      total_compra: parseFloat(total_compra),
    };

    try {
      const respuesta = await fetch("http://localhost:3001/api/registrarCompra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosCompra),
      });

      const data = await respuesta.json();
      if (!respuesta.ok) {
        console.error("Error del servidor:", data);
        return;
      }

      // ✅ Cerrar modal y refrescar lista
      setMostrarModal(false);
      setNuevaCompra({ id_empleado: "", fecha_compra: "", total_compra: "" });
      obtenerCompras();
    } catch (error) {
      console.error("Error al agregar Compra:", error);
      alert("No se pudo guardar la compra. Revisa la consola.");
    }
  };

  useEffect(() => {
    obtenerCompras();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Registro de Compras</h4>

      <Row>
        <Col lg={5} md={6} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModal(true)}
          >
            + Nueva Compra
          </Button>
        </Col>
      </Row>

      <TablaCompras
        compras={comprasPaginadas}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={compras.length} // Total de clientes
        elementosPorPagina={elementosPorPagina} // Elementos por página
        paginaActual={paginaActual} // Página actual
        establecerPaginaActual={establecerPaginaActual} // Método para cambiar página

      />

      <ModalRegistroCompra
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCompra={nuevaCompra}
        manejarCambioInput={manejarCambioInput}
        agregarCompra={agregarCompra}
      />

      <ModalEdicionCompra
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        compraEditada={compraEditada}
        setCompraEditada={setCompraEditada}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionCompra
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        compra={compraAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Compra;

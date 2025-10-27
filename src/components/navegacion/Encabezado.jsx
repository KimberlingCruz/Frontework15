import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  // Alternar visibilidad del menú
  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  // Navegar y cerrar menú
  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };
  return (
    <Navbar expand="md" fixed="top" className="bg-primary">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/inicio")}
          className="text-white fw-bold"
          style={{ cursor: "pointer" }}
        >
          Ferretería
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          className="bg-light"
        />
        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">

              <Nav.Link
                className={mostrarMenu ? "text-marca" : "text white"}
                onClick={() => manejarNavegacion("/")}
              >
                {mostrarMenu ? <i className="bi-house-fill me-2" ></i> : null} Inicio
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/categorias")}
              >
                {mostrarMenu ? <i className="bi-bookmark-fill me-2" ></i> : null} Categorías
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/producto")}
              >
                {mostrarMenu ? <i className="bi-box-fill me-2" ></i> : null} Producto
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/clientes")}
              >
                {mostrarMenu ? <i className="bi-person-fill me-2" ></i> : null} Cliente
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/compras")}
              >
                {mostrarMenu ? <i className="bi-bag-fill me-2"></i> : null} Compra
              </Nav.Link>



              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/empleados")}
              >
                {mostrarMenu ? <i className="bi-people-fill me-2" ></i> : null} Empleados
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/usuarios")}
              >
                {mostrarMenu ? <i className="bi bi-person-vcard-fill"></i> : null} Usuarios
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/ventas")}
              >
                {mostrarMenu ? <i className="bi-bag-check-fill me-2"></i> : null} Ventas
              </Nav.Link>

              <Nav.Link
                className="text danger"
                onClick={() => manejarNavegacion("/catalogo")}
              >
                {mostrarMenu ? <i className="bi-book-fill"></i> : null} Catálogo
              </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default Encabezado;
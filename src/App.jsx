import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/navegacion/Encabezado";

import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Usuario from "./views/Usuario";
import Cliente from "./views/Cliente";
import Compra from "./views/Compra";
import Ventas from "./views/Ventas";
import Empleados from "./views/Empleados";
import Categorias from "./views/Categorias";
import Producto from "./views/Producto";
import Catalogo from "./views/Catalogo";

//Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />a
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/compras" element={<Compra />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
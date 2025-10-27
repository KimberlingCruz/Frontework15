import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Importar componente Encabezado.
import Encabezado from "./components/navegacion/Encabezado";
//Importar las vistas.
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Categorias from "./views/Categorias";
import Productos from "./views/Producto";
import Compra from "./views/Compra";
import Catalogo from "./views/Catalogo";
import Cliente from "./views/Cliente";
//Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/compras" element={<Compra />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
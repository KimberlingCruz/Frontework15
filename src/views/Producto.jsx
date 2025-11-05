import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";

const producto = () => {
  const [productos, setproductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerproductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos');

      if (!respuesta.ok) {
        throw new Error('Error al obtener las productos');
      }
      const datos = await respuesta.json();

      setproductos(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }

  }
 
  useEffect(() => {
    obtenerproductos();
  }, []);

  return (
    <>
      <Container className="mt-4" >
        <h4>Registro de productos</h4>
        <TablaProductos
          productos={productos}
          cargando={cargando}
        />

      </Container>
    </>
  );
}
export default producto;
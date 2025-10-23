import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";

const cliente = () => {
  const [clientes, setCliente] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');

      if (!respuesta.ok) {
        throw new Error('Error al obtener las Cliente');
      }
      const datos = await respuesta.json();

      setCliente(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }

  }

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
      <Container className="mt-4" >
        <h4>Clientes</h4>
        <TablaClientes
          clientes={clientes}
          cargando={cargando}
        />

      </Container>
    </>
  );
}
export default cliente;
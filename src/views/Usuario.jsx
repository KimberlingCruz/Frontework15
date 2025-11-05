import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Tablausuarios from "../components/usuarios/Tablausuarios";

const usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerusuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/usuarios");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las usuarios");
            }
            const datos = await respuesta.json();

            setUsuarios(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerusuarios();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Registro de usuarios</h4>
                <TablaUsuarios
                    usuarios={usuarios}
                    cargando={cargando} />
            </Container>
        </>
    );
}

export default usuario
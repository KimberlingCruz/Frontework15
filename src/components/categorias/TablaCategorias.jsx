import { Table, Spinner } from "react-bootstrap";

const TablaCategorias = ({ categorias, cargado }) => {

    if (cargado)
        return (
            <>

                <Spinner animation="borde" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>

        );
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre categoria </th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categorias) => {

                        return (
                            <tr key={categorias.id_categoria}>
                                <td> {categorias.id_categoria}</td>
                                <td> {categorias.nombre_categoria}</td>
                                <td> {categorias.descripcion_categoria}</td>
                                <td>Accion</td>
                            </tr>
                        );
                    })}


                </tbody>
            </Table >
        </>
    );
}
export default TablaCategorias;
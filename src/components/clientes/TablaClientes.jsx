import { Table, Spinner } from "react-bootstrap";

const TablaClientes = ({ clientes, cargando }) => {

    if (cargando)
        return (
            <>

                <Spinner animation="border" role="status">
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
                        <th>primer_nombre  </th>
                        <th>segundo_nombre</th>
                        <th>primer_apellido</th>
                        <th>segundo_apellido</th>
                        <th>celular</th>
                        <th>direccion</th>
                        <th>cedula</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => {

                        return (
                            <tr key={cliente.id_cliente}>
                                <td> {cliente.id_cliente}</td>
                                <td> {cliente.primer_nombre}</td>
                                <td> {cliente.segundo_nombre}</td>
                                <td> {cliente.primer_apellido}</td>
                                <td> {cliente.segundo_apellido}</td>
                                <td> {cliente.celular}</td>
                                <td> {cliente.direccion}</td>
                                <td> {cliente.cedula}</td>
                                <td>Accion</td>
                            </tr>
                        );
                    })}


                </tbody>
            </Table >
        </>
    );
}
export default TablaClientes;
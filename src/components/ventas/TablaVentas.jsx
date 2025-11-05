import { Table, Spinner } from "react-bootstrap";

const TablaVentas= ({ Ventas, cargando }) => {

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
                        <th>iD_Cliente  </th>
                        <th>ID_Empleado</th>
                        <th>Fecha Venta</th>
                        <th>Total Venta</th>                     
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Ventas.map((Venta) => {

                        return (
                            <tr key={Venta.id_ventas}>
                                <td> {Venta.id_ventas}</td>
                                <td> {Venta.id_Cliente}</td>
                                <td> {Venta.id_empleado}</td>
                                <td> {Venta.fecha_ventas}</td>
                                <td> {Venta.total_ventas}</td>                             
                                <td>Accion</td>
                            </tr>
                        );
                    })}


                </tbody>
            </Table >
        </>
    );
}
export default TablaVentas;
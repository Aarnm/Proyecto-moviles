import type { DetallesVentas } from "../types/ventas";

type DetalleVentaFilaProps = 
{
    index: number,
    detallesVenta: DetallesVentas,
}

export default function DetallesVentaFila({ detallesVenta }:DetalleVentaFilaProps) 
{
    return (
        <>
            <tr>
                <td>{detallesVenta.id_venta}</td>
                <td>{detallesVenta.id_producto}</td>
                <td>{detallesVenta.cantidad}</td>
                <td>{detallesVenta.precio}</td>
            </tr>   
        </>
    )
}
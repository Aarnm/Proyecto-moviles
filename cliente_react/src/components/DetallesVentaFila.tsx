import type { DetallesVentas } from "../types/ventas";

type DetalleVentaFilaProps = 
{
    index: number,
    detallesVenta: DetallesVentas,
    onBorrar: (ventaId: number) => void,
}

export default function DetallesVentaFila({ detallesVenta, onBorrar }:DetalleVentaFilaProps) 
{
    return (
        <>
            <tr>
                <td>{detallesVenta.id_venta}</td>
                <td>{detallesVenta.id_producto}</td>
                <td>{detallesVenta.cantidad}</td>
                <td>{detallesVenta.precio}</td>
                <td>{detallesVenta.subtotal}</td>
                <td>
                    <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">                            
                            <a className="dropdown-item" onClick={()=>onBorrar(detallesVenta.id_venta)}>
                                <i className="icon-base bx bx-trash me-1"></i> Borrar
                            </a>                            
                        </div>
                    </div>
                </td>
            </tr>   
        </>
    )
}
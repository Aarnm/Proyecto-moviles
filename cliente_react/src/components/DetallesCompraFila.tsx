import type { DetallesCompras } from "../types/compras";

type DetalleCompraFilaProps = 
{
    index: number,
    detallesCompras: DetallesCompras,
}

export default function DetallesVentaFila({ detallesCompras }:DetalleCompraFilaProps) 
{
    return (
        <>
            <tr>
                <td>{detallesCompras.id_compra}</td>
                <td>{detallesCompras.id_producto}</td>
                <td>{detallesCompras.cantidad}</td>
                <td>{detallesCompras.precio}</td>
            </tr>   
        </>
    )
}
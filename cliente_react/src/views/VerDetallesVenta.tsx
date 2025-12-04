import { NavLink, useLoaderData } from "react-router-dom";
import { elimDetalleVenta, getDetalleVentas } from "../services/VentasService";
import type { DetallesVentas } from "../types/ventas";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import DetallesVentaFila from "../components/DetallesVentaFila";

export async function loader({ params }: LoaderFunctionArgs) {
    const id_venta = Number(params.id);
    const detallesVentas = await getDetalleVentas(id_venta);
    return { id_venta, detallesVentas: detallesVentas ?? [] };
}

export default function VerDetallesVenta()
{
    const { id_venta, detallesVentas: detallesVentasIni } = useLoaderData() as { id_venta: number; detallesVentas: DetallesVentas[] };
    const [detallesVentas, setDetallesVentas] = useState<DetallesVentas[]>(detallesVentasIni);
    
    const handleEliminar = async (detalleVentaId: number) => {
        if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

        const result = await elimDetalleVenta(detalleVentaId);
        
        if (result && (result as any).success) {
            // Filtrar localmente el detalle eliminado
            setDetallesVentas(
                detallesVentas.filter(det => det.id_venta !== detalleVentaId)
            );
        } else {
            console.error('No se pudo eliminar el producto:', result);
            const msg = (result && (result as any).error) ? (result as any).error : 'Error al eliminar el producto';            
            alert(msg);
        }
    };

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Detalle de la venta #{id_venta}</h5>
                        <NavLink 
                            to={`/ventas/detalles/${id_venta}/editar`}
                            className="btn btn-info btn-sm"
                        >
                            + Agregar detalle
                        </NavLink>
                    </div>
                    
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>Id Venta</th>
                                    <th>Id Producto</th>                                    
                                    <th>Cantidad</th>                                                                        
                                    <th>Precio</th> 
                                    <th>Subtotal</th>
                                    <th>Acciones</th>                                    
                                </tr>
                            </thead>                            
                            <tbody className="table-border-bottom-0">
                                {detallesVentas.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-3">
                                            No hay detalles para esta venta
                                        </td>
                                    </tr>
                                ) : (
                                    detallesVentas.map((detallesVenta, index) => 
                                    (
                                        <DetallesVentaFila 
                                            key={`${detallesVenta.id_venta}-${index}`}
                                            index={index} 
                                            detallesVenta={detallesVenta} 
                                            onBorrar={handleEliminar}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
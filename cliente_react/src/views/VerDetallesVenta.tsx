import { useLoaderData } from "react-router-dom";
import { getDetalleVentas } from "../services/VentasService";
import type { DetallesVentas } from "../types/ventas";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import DetallesVentaFila from "../components/DetallesVentaFila";

export async function loader({ params }: LoaderFunctionArgs) {
    const id_venta = Number(params.id); // <-- Cambia aquí
    const ventas = await getDetalleVentas(id_venta);
    return ventas ?? [];
}

export default function VerVentas()
{
    const detallesVentasIni = useLoaderData() as DetallesVentas[];
     
    const [detallesVentas] = useState<DetallesVentas[]>(detallesVentasIni);

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Detalle de la venta</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Id producto</th>                                    
                                    <th>Cantidad</th>                                                                        
                                    <th>Precio</th>                                    
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {detallesVentas.map((detallesVenta, index) => 
                                (
                                    <DetallesVentaFila key={detallesVenta.id_venta} index={index} detallesVenta={detallesVenta}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
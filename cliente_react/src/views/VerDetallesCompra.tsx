import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import { getDetallesCompras } from "../services/ComprasService";
import type { DetallesCompras } from "../types/compras";
import DetallesCompraFila from "../components/DetallesCompraFila";

export async function loader({ params }: LoaderFunctionArgs) {
    const id_compra = Number(params.id); // <-- Cambia aquí
    const compras = await getDetallesCompras(id_compra);
    return compras ?? [];
}

export default function VerVentas()
{
    const detallesComprasIni = useLoaderData() as DetallesCompras[];
     
    const [detallesCompras] = useState<DetallesCompras[]>(detallesComprasIni);

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Detalle de la compra</h5>
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
                                {detallesCompras.map((detallesCompra, index) => 
                                (
                                    <DetallesCompraFila key={detallesCompra.id_compra} index={index} detallesCompras={detallesCompra}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
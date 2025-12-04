import { useLoaderData } from "react-router-dom";
import type { Compras } from "../types/compras";
import { useState } from "react";
import { elimCompra, getCompras } from "../services/ComprasService";
import ComprasFila from "../components/ComprasFila";

export async function loader()
{
    const compras = await getCompras();
    return compras ?? [];
}

export default function VerCompras()
{
    const ventasIni = useLoaderData() as Compras[];
     
    const [compras, setVentas] = useState<Compras[]>(ventasIni);

    const handleEliminar = async (compraId:number) =>
    {
        //await elimDetalleVenta(compraId);
        await elimCompra(compraId);        
        //filter genera una nueva lista filtrada
        setVentas(compras.filter(compra => compra.id_compra !== compraId));
    }

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Compras</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Rut proveedor</th>
                                    <th>Fecha</th>                                    
                                    <th>Total</th>                                                                        
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {compras.map((compra, index) => 
                                (
                                    <ComprasFila key={compra.id_compra} index={index} compra={compra} onBorrar={handleEliminar}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
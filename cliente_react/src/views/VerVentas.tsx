import { useLoaderData, useNavigate } from "react-router-dom";
import { elimDetalleVenta, elimVenta, getVentas } from "../services/VentasService";
import type { Ventas } from "../types/ventas";
import VentasFila from "../components/VentasFila";
import { useState } from "react";

export async function loader()
{
    const ventas = await getVentas();
    return ventas ?? [];
}

export default function VerVentas()
{
    const ventasIni = useLoaderData() as Ventas[];
     
    const [ventas, setVentas] = useState<Ventas[]>(ventasIni);

    const handleEliminar = async (ventaId:number) =>
    {
        await elimDetalleVenta(ventaId);
        await elimVenta(ventaId);        
        //filter genera una nueva lista filtrada
        setVentas(ventas.filter(venta => venta.id_venta !== ventaId));
    }

    const navigate = useNavigate();

    const handleRefresh = () =>
    {
        navigate(0); // recarga la ruta actual
    };

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Ventas</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Fecha</th>                                    
                                    <th>Total</th>                                                                        
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {ventas.map((venta, index) => 
                                (
                                    <VentasFila key={venta.id_venta} index={index} venta={venta} onBorrar={handleEliminar}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
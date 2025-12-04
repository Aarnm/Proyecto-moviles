import { getProductosBajoStock } from "../services/ProductosService";
import { useLoaderData } from "react-router-dom";
import type { Productos } from "../types/productos";
import { useState } from "react";
import BajoStockFila from "../components/BajoStockFila";

export async function loader()
{
    const productos = await getProductosBajoStock();
    return productos;
}

export default function Home() 
{    
    const productosIni = useLoaderData() as Productos[];
        console.log("Datos iniciales recibidos:", productosIni);
         
        const [productos] = useState<Productos[]>(productosIni);
        console.log("Productos para renderizar:", productos);
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h3 className="card-header">Bienvenidos a la Joyeria Orion</h3>
                    <h5 className="card-header">Productos con bajo stock</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID Producto</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productos.map((producto, index) => (
                                    <BajoStockFila
                                        key={producto.id_producto}
                                        index={index}
                                        producto={producto}
                                    />
                                ))}
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>          
        </>
    )    
}
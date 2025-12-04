import { getProductosBajoStock } from "../services/ProductosService";
import { getProductoMasVendido } from "../services/InformeService";
import { useLoaderData } from "react-router-dom";
import type { Productos } from "../types/productos";
import { useState } from "react";
import BajoStockFila from "../components/BajoStockFila";

export async function loader()
{
    const productos = await getProductosBajoStock();
    const productoMasVendido = await getProductoMasVendido();
    return { productos, productoMasVendido };
}

export default function Home() 
{    
    const loaderData = useLoaderData() as { productos: Productos[]; productoMasVendido: any };
    const productos = loaderData.productos;
    const productoMasVendido = loaderData.productoMasVendido;
        console.log("Datos iniciales recibidos:", productos);
         
        const [productosState] = useState<Productos[]>(productos);
        console.log("Productos para renderizar:", productosState);
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card mb-4">
                    <h3 className="card-header">Bienvenidos a la Joyeria Orion</h3>
                    {/* Informe producto más vendido */}
                    <div className="row mb-4">
                        <div className="col-md-6 offset-md-3">
                            <div className="card shadow border-success">
                                <div className="card-header bg-success text-white text-center">
                                    <h5 className="mb-0">
                                        <i className="bi bi-trophy me-2"></i>
                                        Producto más vendido
                                    </h5>
                                </div>
                                <div className="card-body text-center">
                                    {productoMasVendido ? (
                                        <>
                                            <h4 className="text-success mb-2">{productoMasVendido.nombre}</h4>
                                            <p className="mb-1">ID: <strong>{productoMasVendido.id_producto}</strong></p>
                                            <p className="mb-1">Total vendido: <span className="badge bg-success fs-5">{productoMasVendido.total_vendido}</span></p>
                                        </>
                                    ) : (
                                        <div className="alert alert-warning">No hay datos de ventas.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                {productosState.map((producto, index) => (
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
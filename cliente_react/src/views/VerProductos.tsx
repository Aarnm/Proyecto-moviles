import {  useLoaderData } from "react-router-dom";
import { useState } from "react";
import { getProductos, elimProducto } from "../services/ProductosService";
import type { Productos } from "../types/productos";
import ProductosFila from "../components/ProductosFila";

export async function loader()
{
    const productos = await getProductos();
    return productos;
}

export default function VerProductos()
{
    const productosIni = useLoaderData() as Productos[];
    console.log("Datos iniciales recibidos:", productosIni);
     
    const [productos, setProductos] = useState<Productos[]>(productosIni);
    console.log("Productos para renderizar:", productos);

    const handleEliminar = async (productoId:number) =>
    {    
        if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

        const result = await elimProducto(productoId);
        if (result && (result as any).success) {
            setProductos(productos.filter(pro => pro.id_producto !== productoId));
        } else {
            console.error('No se pudo eliminar el producto:', result);
            const msg = (result && (result as any).error) ? (result as any).error : 'Error al eliminar el producto';            
            alert(msg);
        }
    }

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Productos</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Id Producto</th>
                                    <th>Rut Proveedor</th>                                    
                                    <th>Nombre</th>                                                                        
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Descripcion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {productos.map((producto, index) => {
                                    console.log("Producto en fila:", producto);
                                    return (
                                        <ProductosFila key={producto.id_producto} index={index} producto={producto} onBorrar={handleEliminar} />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
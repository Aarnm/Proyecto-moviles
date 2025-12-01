import { useLoaderData } from "react-router-dom";
import { getProveedores } from "../services/ProveedorService";
import type { Proveedor } from "../types/proveedor";
import { useState } from "react";
import ProveedoresFila from "../components/ProveedoresFila";

export async function loader()
{
    const proveedores = await getProveedores();
    return proveedores;
}

export default function VerProveedores()
{
    const proveedoresIni = useLoaderData() as Proveedor[];
    console.log("Datos iniciales recibidos:", proveedoresIni);
     
    const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIni);
    console.log("Proveedores para renderizar:", proveedores);

    // const handleEliminar = async (productoId:number) =>
    // {
    //     // Confirmar acción con el usuario
    //     if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

    //     const result = await elimProducto(productoId);
    //     if (result && (result as any).success) {
    //         setProductos(productos.filter(pro => pro.id_producto !== productoId));
    //     } else {
    //         console.error('No se pudo eliminar el producto:', result);
    //         const msg = (result && (result as any).error) ? (result as any).error : 'Error al eliminar el producto';
    //         // Mostrar al usuario
    //         alert(msg);
    //     }
    // }

    return (
        <>            
            <div className="container-xxl flex-grow-1 container-p-y">                    
                <div className="card">
                    <h5 className="card-header">Proveedores</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Rut Proveedor</th>                                    
                                    <th>Nombre</th>                                                                        
                                    <th>Telefono</th>
                                    <th>Direccion</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {proveedores.map((proveedores, index) => {
                                    console.log("Proveedores en fila:", proveedores);
                                    return (
                                        <ProveedoresFila key={proveedores.rut_proveedor} index={index} proveedor={proveedores}/>
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
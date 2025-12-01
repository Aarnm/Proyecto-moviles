import { useLoaderData } from "react-router-dom";
import { getProveedor, elimProveedor } from "../services/ProveedorService";
import type { Proveedor } from "../types/proveedor";
import { useState } from "react";
import ProveedoresFila from "../components/ProveedoresFila";

export async function loader()
{
    const proveedores = await getProveedor();
    return proveedores;
}

export default function VerProveedores()
{
    // proteger contra undefined
    const proveedoresIni = useLoaderData() as Proveedor[] | undefined;

    // inicializar estado con array por defecto
    const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIni ?? []);

    const handleEliminar = async (proveedorId:number) =>
    {
        // Confirmar acción con el usuario
        if (!window.confirm('¿Seguro que deseas eliminar este proveedor?')) return;

        const result = await elimProveedor(proveedorId);
        if (result && (result as any).success) {
            setProveedores(proveedores.filter(pro => pro.rut_proveedor !== proveedorId));
        } else {
            console.error('No se pudo eliminar el proveedor:', result);
            const msg = (result && (result as any).error) ? (result as any).error : 'Error al eliminar el proveedor';
            // Mostrar al usuario
            alert(msg);
        }
    }

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
                                {proveedores.map((proveedor, index) => {
                                    console.log("Proveedor en fila:", proveedor);
                                    return (
                                        <ProveedoresFila key={proveedor.rut_proveedor} index={index} proveedor={proveedor} onBorrar={handleEliminar}/>
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

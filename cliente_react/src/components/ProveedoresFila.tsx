import { Link } from "react-router-dom";
import type { Proveedor } from "../types/proveedor";


type ProveedoresFilaProps = 
{
    index: number,
    proveedor: Proveedor,
    onBorrar: (proveedorId: number) => void,
}



export default function ProductosFila({index, proveedor, onBorrar }:ProveedoresFilaProps) 
{
    return (
        <>
            <tr>
                <td>{index+1}</td>                
                <td>{proveedor.rut_proveedor}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.correo}</td>
                <td>
                    <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                            <Link to={`/productos/${proveedor.rut_proveedor}/editar`} className="dropdown-item menu-link">
                                <i className="icon-base bx bx-edit-alt me-1"></i> Editar
                            </Link>
                            <a className="dropdown-item" onClick={()=>onBorrar(proveedor.rut_proveedor)}>
                                <i className="icon-base bx bx-trash me-1"></i> Borrar
                            </a>                                
                        </div>
                    </div>
                </td>
            </tr>   
        </>
    )
}
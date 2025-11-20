import { Link } from "react-router-dom";
import type { Productos } from "../types/productos";


type ProductosFilaProps = 
{
    index: number,
    producto: Productos,
    onBorrar: (productoId: number) => void,
}



export default function ProductosFila({index, producto, onBorrar }:ProductosFilaProps) 
{
    return (
        <>
            <tr>
                <td>{index+1}</td>
                <td>{producto.id_producto}</td>
                <td>{producto.rut_proveedor}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.desc}</td>
                <td>
                    <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                            <Link to={`/productos/${producto.id_producto}/editar`} className="dropdown-item menu-link">
                                <i className="icon-base bx bx-edit-alt me-1"></i> Editar
                            </Link>
                            <a className="dropdown-item" onClick={()=>onBorrar(producto.id_producto)}>
                                <i className="icon-base bx bx-trash me-1"></i> Borrar
                            </a>                            
                        </div>
                    </div>
                </td>
            </tr>   
        </>
    )
}
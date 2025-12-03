import { Link } from "react-router-dom";
import type { Compras } from "../types/compras";

type VentaFilaProps = 
{
    index: number,
    compra: Compras,
    onBorrar: (compraId: number) => void,
}

export function arregloFecha(fecha: string)
{
    const num = fecha.indexOf('T').valueOf();
    console.log(num);
    const aux = fecha.substring(0, num);
    fecha = aux + " " + fecha.substring(num + 1, fecha.indexOf('.'));
    return fecha;
}

export default function VentasFila({index, compra, onBorrar }:VentaFilaProps) 
{
    return (
        <>
            <tr>
                <td>{index}</td>
                <td>{compra.rut_proveedor}</td>
                <td>{arregloFecha(compra.fecha)}</td>                
                <td>{compra.total}</td>
                <td>
                    <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                            <Link to={`/compras/${compra.id_compra}/editar`} className="dropdown-item menu-link">
                                <i className="icon-base bx bx-edit-alt me-1"></i> Editar
                            </Link>
                            <a className="dropdown-item" onClick={()=>onBorrar(compra.id_compra)}>
                                <i className="icon-base bx bx-trash me-1"></i> Borrar
                            </a>                            
                        </div>
                    </div>
                </td>
            </tr>   
        </>
    )
}
import { Link } from "react-router-dom";
import type { Ventas } from "../types/ventas";

type VentaFilaProps = 
{
    index: number,
    venta: Ventas,
    onBorrar: (ventaId: number) => void,
}

export function arregloFecha(fecha: string)
{
    const num = fecha.indexOf('T').valueOf();    
    const aux = fecha.substring(0, num);
    fecha = aux + " " + fecha.substring(num + 1, fecha.indexOf('.'));
    return fecha;
}

export default function VentasFila({index, venta, onBorrar }:VentaFilaProps) 
{
    return (
        <>
            <tr>
                <td>{index}</td>
                <td>{arregloFecha(venta.fecha_venta)}</td>
                <td>{venta.total}</td>
                <td>
                    <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="icon-base bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                            <Link to={`/ventas/${venta.id_venta}/editar`} className="dropdown-item menu-link">
                                <i className="icon-base bx bx-edit-alt me-1"></i> Ver Detalle
                            </Link>
                            <a className="dropdown-item" onClick={()=>onBorrar(venta.id_venta)}>
                                <i className="icon-base bx bx-trash me-1"></i> Borrar
                            </a>                            
                        </div>
                    </div>
                </td>
            </tr>   
        </>
    )
}
import { Request,Response } from "express"
import DetalleVenta from "../models/DetalleVenta"
import Producto from "../models/Producto"




export  const getDetalleVenta = async (request: Request, response:Response) =>{
    //response.json('Listar Ventas')
    const detalle_venta = await DetalleVenta.findAll()
    response.json({data:detalle_venta})
}


// export  const getDetalleVentaById = async (request: Request, response: Response) => {
//     const { id } = request.params;
//     // Busca todos los detalles de venta para ese id_venta
//     const detalles_venta = await DetalleVenta.findAll({
//         where: { id_venta: id },
//         include: [{
//             model: Producto,
//             as: 'producto',
//             attributes: ['nombre']
//         }]
//     });
//     response.json({ data: detalles_venta });
// }

export const getDetalleVentaById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const detalles_venta = await DetalleVenta.findAll({
        where: { id_venta: id }
    });
    response.json({ data: detalles_venta });
}

export const crearDetalleVenta = async (request: Request, response: Response) =>{
    console.log(request.body)
    const detalleNuevo = await DetalleVenta.create(request.body)
    response.json({data:detalleNuevo})
}

//BORRAR
export const borrarDetalleVenta =  async (request: Request, response: Response) =>{
    const {id} = request.params
   // response.json('Borrar Venta:' + id)
   const detalleVenta = await DetalleVenta.findByPk(id)
   await detalleVenta.destroy()
   response.json({data: 'DetalleVenta eliminada'})
}
import { Request,Response } from "express"
import DetalleCompra from "../models/DetalleCompra"

export  const getDetalleCompra = async (request: Request, response:Response) =>{
    
    const detalle_compra = await DetalleCompra.findAll()
    response.json({data:detalle_compra})
}



export const getDetalleCompraById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const detalle_compra = await DetalleCompra.findAll({
        where: { id_compra: id }
    });
    response.json({ data: detalle_compra });
}


export const crearDetalleCompra = async (request: Request, response: Response) =>{
    console.log(request.body)
    const detalleNuevo = await DetalleCompra.create(request.body)
    response.json({data:detalleNuevo})
}


export const editarDetalleCompra = async (request: Request, response: Response) =>{
    const {id} = request.params
    response.json('Editar detalle compra:' + id)
    const detalle_compra  = await DetalleCompra.findByPk(id)
    await detalle_compra.update(request.body)
    await detalle_compra.save()
    response.json({data: detalle_compra})
}

export const borrarDetalleCompra =  async (request: Request, response: Response) =>{
    const {id} = request.params
   response.json('Borrar Detalle Compra:' + id)
   const detalle_compra = await DetalleCompra.findByPk(id)
   await detalle_compra.destroy()
   response.json({data: 'Detalle Compra eliminada'})
}
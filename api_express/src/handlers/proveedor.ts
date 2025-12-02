import { Request,Response } from "express"
import Proveedor from "../models/Proveedor"




export  const getProveedor = async (request: Request, response:Response) =>{
    
    const proveedor = await Proveedor.findAll()
    response.json({data:proveedor})
}


export const crearProveedor = async (request: Request, response: Response) =>{
    const proveedorNuevo = await Proveedor.create(request.body)
    response.json({data:proveedorNuevo})
}


export const borrarProveedor =  async (request: Request, response: Response) =>{
    const {id} = request.params
   const proveedor = await Proveedor.findByPk(id)
   await proveedor.destroy()
   response.json({data: 'Proveedor eliminado'})
}


export const editarProveedor = async (request: Request, response: Response) =>{
    const {id} = request.params
    response.json('Editar Proveedor:' + id)
    const proveedor  = await Proveedor.findByPk(id)
    await proveedor.update(request.body)
    await proveedor.save()
    response.json({data: proveedor})
}
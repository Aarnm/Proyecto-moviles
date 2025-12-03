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


export const getProveedorById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params 

  try {
    const proveedor = await Proveedor.findByPk(id)


    if (!proveedor) {
      res.status(404).json({ error: 'Proveedor no encontrado' }) 
      return 
    }

    res.json({data:proveedor}) 
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar proveedor' }) 
  }
} 
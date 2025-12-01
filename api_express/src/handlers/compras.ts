import { Request,Response } from "express"
import Compra from "../models/Compra"

export  const getCompra = async (request: Request, response:Response) =>{
    
    const compra = await Compra.findAll()
    response.json({data:compra})
}


export const crearCompra = async (request: Request, response: Response) =>{
    const compraNueva = await Compra.create(request.body)
    response.json({data:compraNueva})
}

export const borrarCompra =  async (request: Request, response: Response) =>{
    const {id} = request.params
   const compra = await Compra.findByPk(id)
   await compra.destroy()
   response.json({data: 'Compra eliminada'})
}
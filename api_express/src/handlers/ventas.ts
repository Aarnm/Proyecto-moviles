import { Request,Response } from "express"
import Venta from "../models/Venta"

export const getVentas = async (request: Request, response: Response) => {
    try {
        const ventas = await Venta.findAll();
        console.log("Ventas desde la BD:", ventas);
        response.json({ data: ventas });
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        response.status(500).json({ error: "No se pudieron obtener ventas" });
    }
}


//crear venta
export const crearVenta = async (request: Request, response: Response) =>{
    const ventaNueva = await Venta.create(request.body)
    response.json({data:ventaNueva})
}


//EDITAR
export const editarVenta = async (request: Request, response: Response) =>{
    const {id} = request.params
    //response.json('Editar Venta:' + id)
    const venta  = await Venta.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

//BORRAR
export const borrarVenta =  async (request: Request, response: Response) =>{
    const {id} = request.params
   // response.json('Borrar Venta:' + id)
   const venta = await Venta.findByPk(id)
   await venta.destroy()
   response.json({data: 'Venta eliminada'})
}
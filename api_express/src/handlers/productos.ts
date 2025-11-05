import { Request,Response } from "express"
import Producto from "../models/Producto"
import Proveedor from "../models/Proveedor"

//LISTAR PRODUCTOS
export  const getProducto = async (request: Request, response:Response) =>{
    
    const producto = await Producto.findAll()
    response.json({data:producto})
}

export const getProductoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params 

  try {
    const producto = await Producto.findByPk(id,{
      include: [
        {
          model: Proveedor,
          attributes: ['nombre']
        }
        
      ],
    })

    if (!producto) {
      res.status(404).json({ error: 'Juego no encontrado' }) 
      return 
    }

    res.json({data:producto}) 
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar producto' }) 
  }
} 
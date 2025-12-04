import { Request,Response } from "express"
import Producto from "../models/Producto"
import Proveedor from "../models/Proveedor"
import DetalleVenta from "../models/DetalleVenta"
import { Op } from "sequelize"
import { Sequelize } from "sequelize-typescript"

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
      res.status(404).json({ error: 'producto no encontrado' }) 
      return 
    }

    res.json({data:producto}) 
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar producto' }) 
  }
} 




export const borrarProducto =  async (request: Request, response: Response) =>{
    const {id} = request.params
    response.json('Borrar Producto:' + id)
   const producto = await Producto.findByPk(id)
   await producto.destroy()
   response.json({data: 'Producto eliminado'})
}



export const crearProducto = async (request: Request, response: Response) =>{
    const productoNuevo = await Producto.create(request.body)
    response.json({data:productoNuevo})
}

export const editarProducto = async (request: Request, response: Response) =>{
    const {id} = request.params
    const producto  = await Producto.findByPk(id)
    
    if (!producto) {
        return response.status(404).json({ error: 'Producto no encontrado' })
    }
    
    await producto.update(request.body)
    await producto.save()
    
    response.json({data: producto})
}

export const getProductosBajoStock = async (req, res) => {
    try 
    {
        const productos = await Producto.findAll({
            where: {
                stock: {
                    [Op.lt]: 30
                }
            }
        });

        res.json({ data: productos });

    } catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: "Error al obtener productos con bajo stock" });
    }
}

export const getProductoMasVendido = async (req, res) => {
    try {
        const resultado = await DetalleVenta.findAll({
            attributes: [
                'id_producto',
                [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'total_vendido']
            ],
            group: ['id_producto'],
            order: [[Sequelize.literal('total_vendido'), 'DESC']],
            limit: 1
        });

        if (!resultado.length) {
            return res.json(null);
        }

        const detalle = resultado[0];
        const producto = await Producto.findByPk(detalle.id_producto);

        res.json({
            id_producto: producto.id_producto,
            nombre: producto.nombre,
            total_vendido: detalle.get('total_vendido')
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener el producto más vendido' });
    }
}
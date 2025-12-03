import { Request,Response } from "express"
import DetalleVenta from "../models/DetalleVenta"
import Producto from "../models/Producto"
import Venta from "../models/Venta"




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

export const crearDetalleVenta = async (req, res) => {
    try {
        const { id_venta, id_producto, cantidad, precio } = req.body;

        const subtotal = cantidad * precio;

        const detalle = await DetalleVenta.create({
            id_venta,
            id_producto,
            cantidad,
            precio,
            subtotal
        });

        const detalles = await DetalleVenta.findAll({
            where: { id_venta }
        });

        const total = detalles.reduce((acc, det) => acc + det.subtotal, 0);

        const venta = await Venta.findByPk(id_venta);
        await venta.update({ total });

        const producto = await Producto.findByPk(id_producto);

        const nuevoStock = producto.stock - cantidad;
        await producto.update({ stock: nuevoStock });

        return res.json({ data: detalle });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el detalle de venta" });
    }
};

//BORRAR
export const borrarDetalleVenta =  async (request: Request, response: Response) =>{
    const {id} = request.params
   // response.json('Borrar Venta:' + id)
   const detalleVenta = await DetalleVenta.findByPk(id)
   await detalleVenta.destroy()
   response.json({data: 'DetalleVenta eliminada'})
}
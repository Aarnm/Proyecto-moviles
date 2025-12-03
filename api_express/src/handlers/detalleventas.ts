import { Request,Response } from "express"
import DetalleVenta from "../models/DetalleVenta"
import Producto from "../models/Producto"
import Venta from "../models/Venta"
import sequelize from "../config/database";




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
    const t = await sequelize.transaction();
    try {
        const { id_venta, id_producto, cantidad, precio } = req.body;

        const producto = await Producto.findByPk(id_producto, { transaction: t });

        if (!producto) {
            await t.rollback();
            return res.status(400).json({ error: "Producto no encontrado." });
        }

        if (producto.stock < cantidad) {
            await t.rollback();
            return res.status(400).json({
                error: `Stock insuficiente. Stock actual: ${producto.stock}, solicitado: ${cantidad}`
            });
        }

        const subtotal = cantidad * precio;

        const detalle = await DetalleVenta.create({
            id_venta,
            id_producto,
            cantidad,
            precio,
            subtotal
        }, { transaction: t });

        const detallesVenta = await DetalleVenta.findAll({
            where: { id_venta },
            transaction: t
        });

        const total = detallesVenta.reduce((acc, d) => acc + d.subtotal, 0);

        await Venta.update(
            { total },
            { where: { id_venta }, transaction: t }
        );

        await producto.update(
            { stock: producto.stock - cantidad },
            { transaction: t }
        );

        await t.commit();

        res.json({ data: detalle });

    } catch (error) {
        console.error(error);
        await t.rollback(); // <--- IMPORTANTE

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
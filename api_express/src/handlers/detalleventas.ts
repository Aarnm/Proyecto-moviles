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
        await t.rollback();

        res.status(500).json({ error: "Error al crear el detalle de venta" });
    }
};

export const borrarDetalleVenta = async (req, res) => {
    const { id } = req.params;
    console.log("Request borrarDetalleVenta recibida. params.id =", id);

    const t = await sequelize.transaction();
    try {
        // Buscar por la primary key (puede ser id_detalle)
        const detalle = await DetalleVenta.findByPk(id, { transaction: t });
        
        if (!detalle) {
            await t.rollback();
            console.log("Detalle no encontrado con id:", id);
            return res.status(404).json({ error: "Detalle no encontrado" });
        }

        const id_venta = detalle.getDataValue('id_venta');
        const id_producto = detalle.getDataValue('id_producto');
        const cantidad = detalle.getDataValue('cantidad');

        console.log("Eliminando detalle:", { id, id_venta, id_producto, cantidad });

        // Eliminar detalle
        await detalle.destroy({ transaction: t });

        // Recalcular total sumando subtotales de detalles restantes
        const nuevoTotal = (await DetalleVenta.sum('subtotal', {
            where: { id_venta },
            transaction: t
        })) || 0;

        console.log("Nuevo total calculado (post-delete):", nuevoTotal);

        // Actualizar venta - INTENTA CON AMBOS NOMBRES DE COLUMNA
        try {
            await Venta.update(
                { precio_total: nuevoTotal },  // Intenta primero con precio_total
                { where: { id_venta }, transaction: t }
            );
            console.log("Venta actualizada con precio_total");
        } catch (e) {
            console.log("precio_total no funcionó, intentando total...");
            await Venta.update(
                { total: nuevoTotal },  // Si falla, intenta con total
                { where: { id_venta }, transaction: t }
            );
            console.log("Venta actualizada con total");
        }

        // Devolver stock al producto
        const producto = await Producto.findByPk(id_producto, { transaction: t });
        if (producto) {
            const nuevoStock = (producto.getDataValue('stock') || 0) + Number(cantidad);
            await producto.update(
                { stock: nuevoStock },
                { transaction: t }
            );
            console.log("Stock devuelto al producto:", { id_producto, nuevoStock });
        }

        await t.commit();

        return res.json({ success: true, total: nuevoTotal, message: "DetalleVenta eliminada " + nuevoTotal });

    } catch (error) {
        console.error("Error en borrarDetalleVenta:", error);
        await t.rollback();
        return res.status(500).json({ error: error.message || "Error eliminando el detalle" });
    }
};
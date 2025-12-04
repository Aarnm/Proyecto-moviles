import { Request,Response } from "express"
import Venta from "../models/Venta"
import DetalleVenta from "../models/DetalleVenta"
import Producto from "../models/Producto"

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
export const borrarVenta = async (request: Request, response: Response) => {
    const { id } = request.params;
    
    try {
        // 1. Buscar la venta
        const venta = await Venta.findByPk(id);
        
        if (!venta) {
            return response.status(404).json({ error: 'Venta no encontrada' });
        }

        // 2. Obtener todos los detalles de la venta
        const detalles = await DetalleVenta.findAll({ where: { id_venta: id } });

        // 3. Devolver el stock de cada producto
        for (const detalle of detalles) {
            const producto = await Producto.findByPk(detalle.id_producto);
            if (producto) {
                await producto.update({
                    stock: producto.stock + detalle.cantidad
                });
                console.log(`Stock devuelto al producto ${producto.id_producto}: +${detalle.cantidad}`);
            }
        }

        // 4. Eliminar los detalles de la venta
        await DetalleVenta.destroy({ where: { id_venta: id } });

        // 5. Eliminar la venta
        await venta.destroy();

        response.json({ 
            success: true, 
            message: 'Venta eliminada y stock devuelto',
            detallesDevueltos: detalles.length
        });

    } catch (error) {
        console.error('Error al borrar venta:', error);
        response.status(500).json({ 
            error: 'Error al eliminar la venta',
            details: error.message 
        });
    }
}
import { Request,Response } from "express"
import Compra from "../models/Compra"
import DetalleCompra from "../models/DetalleCompra"
import Producto from "../models/Producto"
import Proveedor from "../models/Proveedor"

export  const getCompra = async (request: Request, response:Response) =>{
    
    const compra = await Compra.findAll()
    response.json({data:compra})
}


export const crearCompra = async (request: Request, response: Response) => {
    try {
        const { rut_proveedor, fecha, detalles } = request.body;

        // Validar que vengan los datos necesarios
        if (!rut_proveedor || !fecha || !detalles || detalles.length === 0) {
            return response.status(400).json({ 
                error: 'Faltan datos requeridos. Se necesita: rut_proveedor, fecha y detalles (array)' 
            });
        }

        // Validar que el proveedor exista
        const proveedorExiste = await Proveedor.findByPk(rut_proveedor);
        if (!proveedorExiste) {
            return response.status(404).json({ 
                error: `El proveedor con RUT ${rut_proveedor} no existe. Debe crear el proveedor primero.` 
            });
        }

        // Calcular el total de la compra
        let total = 0;
        for (const detalle of detalles) {
            const subtotal = detalle.cantidad * detalle.precio;
            total += subtotal;
        }

        // Crear la compra (el id_compra se autoincrementa)
        const compraNueva = await Compra.create({
            rut_proveedor,
            fecha,
            total
        });

        // Procesar cada detalle de la compra
        const detallesCreados = [];
        for (const detalle of detalles) {
            const { id_producto, nombre, rut_proveedor: rut_producto, precio, cantidad, desc } = detalle;

            // Buscar si el producto ya existe
            let producto = await Producto.findByPk(id_producto);

            if (producto) {
                // Si el producto existe, aumentar el stock
                await producto.update({
                    stock: producto.stock + cantidad
                });
            } else {
                // Si no existe, crear el producto nuevo
                producto = await Producto.create({
                    id_producto,
                    nombre: nombre || 'Sin nombre',
                    rut_proveedor: rut_producto || rut_proveedor,
                    precio,
                    stock: cantidad,
                    desc: desc || ''
                });
            }

            // Crear el detalle de compra
            const subtotal = cantidad * precio;
            const detalleCompra = await DetalleCompra.create({
                id_compra: compraNueva.id_compra,
                id_producto,
                cantidad,
                precio,
                subtotal
            });

            detallesCreados.push(detalleCompra);
        }

        // Responder con la compra y sus detalles
        response.status(201).json({
            message: 'Compra creada exitosamente',
            data: {
                compra: compraNueva,
                detalles: detallesCreados
            }
        });

    } catch (error) {
        console.error('Error al crear compra:', error);
        response.status(500).json({ 
            error: 'Error al crear la compra',
            details: error.message 
        });
    }
}

export const borrarCompra =  async (request: Request, response: Response) =>{
    const {id} = request.params
   const compra = await Compra.findByPk(id)
   await compra.destroy()
   response.json({data: 'Compra eliminada'})
}
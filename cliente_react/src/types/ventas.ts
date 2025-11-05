import { array, nonEmpty, number, object, pipe, string, type InferOutput, length, custom, minLength, maxLength } from "valibot";

export const DetalleVentaSchema = object
(
    {
        id_venta: number(),
        id_producto: number(),
        cantidad: number(),
        precio: string(),
        //producto: string(),
    }
);

const idsValidos = ["101", "102", "103", "104"]; // IDs válidos

export const IngresoVentaSchema = object
(
    {        
        id_producto: pipe(string(), nonEmpty('El id del producto no puede estar vacio'), custom((value) => idsValidos.includes(value as string), 'El id delproducto no existe')),
        cantidad: pipe(string(), maxLength(11, 'La cantidad no puede pasar de 11 digitos'), nonEmpty('La cantidad no puede estar vacío'),),    
    }
);

export const VentaSchema = object
(
    {
        id_venta: number(),
        fecha_venta: string(),
        precio_total: string(),
        //detallesVenta: array(DetalleVentaSchema),
    }
);

export const VentasSchema = array(VentaSchema);
export const DetallesVentasSchema = array(DetalleVentaSchema);

export type Ventas = InferOutput<typeof VentaSchema>;
export type DetallesVentas = InferOutput<typeof DetalleVentaSchema>;
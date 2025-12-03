import { array, nonEmpty, number, object, pipe, string, type InferOutput, maxLength } from "valibot";

export const DetalleVentaSchema = object
(
    {
        id_venta: number(),
        id_producto: number(),
        cantidad: number(),
        precio: number(),
        subtotal: number(),
    }
);

export const IngresoVentaSchema = object
(
    {        
        id_producto: pipe(string(), nonEmpty('El id del producto no puede estar vacio')),
        cantidad: pipe(string(), maxLength(11, 'La cantidad no puede pasar de 11 digitos'), nonEmpty('La cantidad no puede estar vacío'),),    
    }
);

export const VentaSchema = object
(
    {
        id_venta: number(),
        fecha_venta: string(),
        total: string(),
        //detallesVenta: array(DetalleVentaSchema),
    }
);

export const VentasSchema = array(VentaSchema);
export const DetallesVentasSchema = array(DetalleVentaSchema);

export type Ventas = InferOutput<typeof VentaSchema>;
export type DetallesVentas = InferOutput<typeof DetalleVentaSchema>;
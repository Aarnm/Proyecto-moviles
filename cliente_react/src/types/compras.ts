import { array, number, object, string, type InferOutput } from "valibot";

export const CompraSchema = object
(
    {
        id_compra: number(),
        rut_proveedor: number(),
        fecha: string(),
        precio_total: string(),
        //producto: string(),
    }
);

export const DetalleCompraSchema = object
(
    {
        id_compra: number(),
        id_producto: number(),
        cantidad: number(),
        precio: string(),
        //producto: string(),
    }
);

export const ComprasSchema = array(CompraSchema);
export const DetallesComprasSchema = array(DetalleCompraSchema);

export type Compras = InferOutput<typeof CompraSchema>;
export type DetallesCompras = InferOutput<typeof DetalleCompraSchema>;
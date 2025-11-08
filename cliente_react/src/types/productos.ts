import { array, number, object, string, type InferOutput } from "valibot";

export const ProductoSchema = object
(
    {
        id_producto: number(),
        rut_proveedor: number(),
        nombre:string(),
        precio:string(),
        stock:number(),
        desc:string(),
        
    }
);


export const ProductosSchema = array(ProductoSchema);



export type Productos = InferOutput<typeof ProductoSchema>;

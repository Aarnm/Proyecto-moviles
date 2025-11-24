import { array, number, object, string, type InferOutput } from "valibot";

export const ProveedorSchema = object
(
    {
        rut_proveedor: number(),
        nombre:string(),
        telefono:string(),
        direccion:number(),
        correo:string(),        
    }
);

export const ProveedoresSchema = array(ProveedorSchema);

export type Proveedor = InferOutput<typeof ProveedorSchema>;
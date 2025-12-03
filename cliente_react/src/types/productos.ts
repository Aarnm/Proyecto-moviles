import { array, maxLength, nonEmpty, nullable, number, object, pipe, regex, string, type InferOutput } from "valibot";

export const ProductoSchema = object({
    id_producto: number(),
    rut_proveedor: number(),
    nombre: string(),
    precio: string(),
    stock: number(),
    desc: nullable(string()),
});

export const AñadirProductoSchema = object
(
    {
        id_producto: pipe(string(), nonEmpty("El id no puede estar vacío"), regex(/^\d+$/, "El id solo puede contener números"), maxLength(11, "El id no puede exceder los 11 dígitos"),),
        rut_proveedor: pipe(string(), nonEmpty("El rut no puede estar vacío"), regex(/^\d+$/, "El rut solo puede contener números"), maxLength(11, "El rut no puede exceder los 11 dígitos"),),
        nombre:pipe(string(), nonEmpty('El nombre no puede estar vacío'), maxLength(255, 'El nombre no puede exceder los 255 caracteres')),
        precio:pipe(string(), nonEmpty("El precio no puede estar vacío"), regex(/^\d+$/, "El precio solo puede contener números"), maxLength(10, "El precio no puede exceder los 10 dígitos")),
        stock:pipe(string(), nonEmpty("El stock no puede estar vacío"), regex(/^\d+$/, "El stock solo puede contener números"), maxLength(11, "El stock no puede exceder los 11 dígitos")),
        descripcion:pipe(string(), maxLength(255, 'La descripción no puede exceder los 255 caracteres')),
    }
);

export const EditarProductoSchema = object
(
    {       
        id_producto: pipe(string(), nonEmpty("El id no puede estar vacío"), regex(/^\d+$/, "El id solo puede contener números"), maxLength(11, "El id no puede exceder los 11 dígitos"),), 
        rut_proveedor: pipe(string(), nonEmpty("El rut no puede estar vacío"), regex(/^\d+$/, "El rut solo puede contener números"), maxLength(11, "El rut no puede exceder los 11 dígitos"),),
        nombre:pipe(string(), nonEmpty('El nombre no puede estar vacío'), maxLength(255, 'El nombre no puede exceder los 255 caracteres')),
        precio:pipe(string(), nonEmpty("El precio no puede estar vacío"), regex(/^\d+$/, "El precio solo puede contener números"), maxLength(10, "El precio no puede exceder los 10 dígitos")),
        stock:pipe(string(), nonEmpty("El stock no puede estar vacío"), regex(/^\d+$/, "El stock solo puede contener números"), maxLength(11, "El stock no puede exceder los 11 dígitos")),
        descripcion:pipe(string(), maxLength(255, 'La descripción no puede exceder los 255 caracteres')),
    }
);

export const ProductosSchema = array(ProductoSchema);
export const AñadirProductosSchema = array(AñadirProductoSchema);

export type Productos = InferOutput<typeof ProductoSchema>;
export type AñadirProducto = InferOutput<typeof AñadirProductoSchema>;
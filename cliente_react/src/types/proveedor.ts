import { array, maxLength, minLength, nonEmpty, number, object, pipe, string, type InferOutput, regex } from "valibot";

export const ProveedorSchema = object
(
    {
        rut_proveedor: number(),
        nombre:string(),
        telefono:string(),
        direccion:string(),
        correo:string(),        
    }
);

export const AñadirProveedorSchema = object
(
    {
        rut_proveedor: pipe(string(), nonEmpty("El rut no puede estar vacío"), regex(/^\d+$/, "El rut solo puede contener números"), maxLength(11, "El rut no puede exceder los 11 dígitos")),
        nombre: pipe(string(), nonEmpty('El nombre no puede estar vacío'), minLength(3, 'El nombre debe tener al menos 3 caracteres'), maxLength(255, 'El nombre no puede exceder los 255 caracteres')),
        telefono: pipe(string(), nonEmpty('El numero no puede estar vacío'), maxLength(255, 'El numero no puede exceder los 255 caracteres')),
        direccion: pipe(string(), nonEmpty('La dirección no puede estar vacía'), maxLength(255, 'El dirección no puede exceder los 255 caracteres')),
        correo: pipe(string(), nonEmpty('El correo no puede estar vacío'), maxLength(255, 'El correo no puede exceder los 255 caracteres')),
    }
);

export const ProveedoresSchema = array(ProveedorSchema);

export type Proveedor = InferOutput<typeof ProveedorSchema>;
import { object, pipe, string, length, number, custom } from "valibot";

export const DetalleVentaSchema = object({
    patenteVehiculo: pipe(string(), length(6, 'La patente debe contener 6 dígitos')),
    tipoVehiculo: pipe(string(), length(1, 'Debes seleccionar un tipo de vehiculo')),
    stock: pipe(number(), custom((value) => (value as number) <= 99999999999, 'El stock debe tener como máximo 11 dígitos'))
});
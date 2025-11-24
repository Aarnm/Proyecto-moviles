import axios from "axios";
import { ProveedoresSchema } from "../types/proveedor";
import { safeParse } from "valibot";

export async function getProveedores() {
    try {
        const url = `http://localhost:4000/api/productos`; //cambiar url con el router de api
        const { data } = await axios.get(url);

        // Log para inspeccionar la forma real que devuelve el backend
        console.log("Respuesta cruda de proveedores:", data);

        // Normalizar varias formas posibles
        let productosArray: unknown;
        if (Array.isArray(data)) {
            productosArray = data;
        } else if (Array.isArray((data as any).data)) {
            productosArray = (data as any).data;
        } else if (Array.isArray((data as any).products)) {
            productosArray = (data as any).products;
        } else {
            console.warn("Formato inesperado de proveedores:", data);
            productosArray = [];
        }

        const resultado = safeParse(ProveedoresSchema, productosArray);
        if (resultado.success) {
            return resultado.output;
        } else {
            console.error("Validación de proveedores fallida:", resultado, "payload usado:", productosArray);
            return [];
        }
    } catch (error) {
        console.error("El error al obtener: ", error);
        return [];
    }
}
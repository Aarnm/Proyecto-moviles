import { safeParse } from "valibot";
import { ProductosSchema } from "../types/productos";
import axios from "axios";

export async function getProductos() {
    try {
        const url = `http://localhost:4000/api/productos`;
        const { data: productos } = await axios.get(url);
        // La API devuelve un array directo, no un objeto con .data
        const resultado = safeParse(ProductosSchema, productos);
        if (resultado.success) {
            return resultado.output;
        } else {
            console.error("Validación de productos fallida:", resultado);
            return [];
        }
    } catch (error) {
        console.error("El error al obtener: ", error);
        return [];
    }
}



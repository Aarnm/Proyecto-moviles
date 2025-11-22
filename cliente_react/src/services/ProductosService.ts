import { safeParse } from "valibot";
import { ProductosSchema } from "../types/productos";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function getProductos() {
    try {
        const url = `http://localhost:4000/api/productos`;
        const { data } = await axios.get(url);

        // Log para inspeccionar la forma real que devuelve el backend
        console.log("Respuesta cruda de productos:", data);

        // Normalizar varias formas posibles
        let productosArray: unknown;
        if (Array.isArray(data)) {
            productosArray = data;
        } else if (Array.isArray((data as any).data)) {
            productosArray = (data as any).data;
        } else if (Array.isArray((data as any).products)) {
            productosArray = (data as any).products;
        } else {
            console.warn("Formato inesperado de productos:", data);
            productosArray = [];
        }

        const resultado = safeParse(ProductosSchema, productosArray);
        if (resultado.success) {
            return resultado.output;
        } else {
            console.error("Validación de productos fallida:", resultado, "payload usado:", productosArray);
            return [];
        }
    } catch (error) {
        console.error("El error al obtener: ", error);
        return [];
    }
}




export async function elimProducto(productoId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/productos/${productoId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el producto" };
    }
}
import { safeParse } from "valibot";
import { AñadirProductoSchema, EditarProductoSchema, ProductoSchema, ProductosSchema, type AñadirProducto } from "../types/productos";
import axios from "../services/axiosInstance";

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

export async function getProductosById(productoId: number) {
    try {
        const url = `http://localhost:4000/api/productos/${productoId}`;
        const { data } = await axios.get(url);

        console.log("Respuesta cruda del backend:", data);

        // Normalizamos la forma real
        const productoReal = (data as any).data ?? data;

        const resultado = safeParse(ProductoSchema, productoReal);

        if (resultado.success) {
            return resultado.output;
        } else {
            console.error("Validación del producto fallida:", resultado, "payload:", productoReal);
            return null;
        }

    } catch (error) {
        console.error("Error al obtener producto: ", error);
        return null;
    }
}

export async function elimProducto(productoId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/borrar-producto/${productoId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el producto" };
    }
}

export async function añadirProducto(formData: AñadirProducto ) 
{
    try
    {
        const resultado = safeParse(AñadirProductoSchema, formData);
        if (resultado.success) 
        {            
            const url = `http://localhost:4000/api/crear-producto`;
            await axios.post(url, resultado.output);
            return {success: true};
        }
        else
        {
            const detalleErrores: Record<string, string[]> = {}
            
            for (const issue of resultado.issues) 
            {
                const campo = issue.path![0].key as string
                if (!detalleErrores[campo]) 
                {
                    detalleErrores[campo] = [];
                }
                detalleErrores[campo].push(issue.message);
            }
            console.log(detalleErrores[0]);
            console.error("Valibot error:", resultado.issues);            
            console.error("Issues detallados:", JSON.stringify(resultado.issues, null, 2));
            return { success: false, error: "El formulario contiene errores", detalleErrores: detalleErrores };
        }
    }
    catch (error)
    {
        return { success: false, error: "No se pudo añadir el producto" };
    }
}

export async function editarProducto(formData: EditarProductoFormData, productoId: number ) 
{
    try
    {
        const resultado = safeParse(EditarProductoSchema, formData);
        if (resultado.success) 
        {            
            const url = `http://localhost:4000/api/editar-producto/${productoId}`;
            await axios.put(url, resultado.output);
            return {success: true};
        }
        else
        {
            const detalleErrores: Record<string, string[]> = {}
            
            for (const issue of resultado.issues) 
            {
                const campo = issue.path![0].key as string;
                if (!detalleErrores[campo]) 
                {
                    detalleErrores[campo] = [];
                }
                detalleErrores[campo].push(issue.message);
            }

            console.error("Valibot error:", resultado.issues);            
            return { 
                success: false, 
                error: "El formulario contiene errores", 
                detalleErrores 
            };
        }
    }
    catch (error)
    {
        return { success: false, error: "No se pudo editar el producto" };
    }
}

type EditarProductoFormData = 
{
    [k:string]: FormDataEntryValue
}
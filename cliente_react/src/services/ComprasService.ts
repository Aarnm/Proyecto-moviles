import axios from "../services/axiosInstance";
import { safeParse } from "valibot";
import { ComprasSchema, DetallesComprasSchema } from "../types/compras";

export async function getCompras() 
{    
    try
    {
        const url = `http://localhost:4000/api/compras`; 
        const {data:ventas} = await axios.get(url);
        const resultado = safeParse(ComprasSchema, ventas.data);
        if (resultado.success) 
        {
            return resultado.output;
        } 
        else 
        {
            throw new Error("Ocurrio un problema al solicitar los datos");
        }   
    }   
    catch (error) 
    {
        console.error("El error al obtener: ", error);
    }  
}

export async function elimCompra(compraId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/borrar-compra/${compraId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar la compra" };
    }
}

export async function getDetallesCompras(compraId: number) 
{    
    try
    {
        const url = `http://localhost:4000/api/detalleVenta/${compraId}`; 
        const {data:detalles} = await axios.get(url);
        const resultado = safeParse(DetallesComprasSchema, detalles.data); // <-- Cambia aquí
        if (resultado.success) 
        {
            return resultado.output;
        } 
        else 
        {
            throw new Error("Ocurrio un problema al solicitar los datos");
        }   
    }   
    catch (error) 
    {
        console.error("El error al obtener: ", error);
    }  
}



export async function añadirCompra(compraData: {
    rut_proveedor: number;
    fecha: string;
    detalles: Array<{
        id_producto: number;
        nombre?: string;
        rut_proveedor?: number;
        precio: number;
        cantidad: number;
        desc?: string;
    }>;
}) {
    try {
        const url = `http://localhost:4000/api/crear-compra`;
        await axios.post(url, compraData);
        return { success: true };
    } catch (error) {
        console.error("Error al crear compra:", error);
        return { 
            success: false, 
            error: "No se pudo crear la compra. Verifique que el proveedor exista." 
        };
    }
}
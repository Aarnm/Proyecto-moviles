import axios from "axios";
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

// export async function elimDetalleCompra(detaleId: number) 
// {
//     try
//     {
//         const url = `http://localhost:4000/api/detalleVenta/${detaleId}`;        
//         await axios.delete(url);        
//         return { success: true };
//     }
//     catch (error)
//     {
//         return { success: false, error: "No se pudo eliminar el detalle de venta" };
//     }
// }
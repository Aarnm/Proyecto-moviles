import axios from 'axios';
import { safeParse } from "valibot";
import { DetallesVentasSchema, IngresoVentaSchema, VentasSchema } from '../types/ventas';

export async function getVentas() 
{    
    try
    {
        const url = `http://localhost:4000/api/ventas`; 
        const {data:ventas} = await axios.get(url);
        const resultado = safeParse(VentasSchema, ventas.data);
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

export async function elimVenta(ventaId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/ventas/${ventaId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el arriendo" };
    }
}

export async function elimDetalleVenta(detaleId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/detalleVenta/${detaleId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el arriendo" };
    }
}

export async function editarVenta(ventaId: number) 
{
    try
    {        
        const url = `http://localhost:4000/api/ventas/${ventaId}`;        
        await axios.put(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo devolver el arriendo" };
    }
}
type IngresarVentaData =
{
    [k:string]: FormDataEntryValue
}

export async function añadirVenta(formData: IngresarVentaData ) 
{
    try
    {
        const resultado = safeParse(IngresoVentaSchema, formData);
        if (resultado.success) 
        {            
            const url = `http://localhost:4000/api/ventas`;
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
            return { success: false, error: "El formulario contiene errores", detalleErrores: detalleErrores };
        }
    }
    catch (error)
    {
        return { success: false, error: "No se pudo ingresar el arriendo" };
    }
}

export async function añadirVenta2() 
{    
    try
    {
        const url = `http://localhost:4000/api/ventas`; 
        const {data:ventas} = await axios.post(url);
        const resultado = safeParse(VentasSchema, ventas.data);
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

export async function getDetallesVentas(ventaId: number) 
{    
    try
    {
        const url = `http://localhost:4000/api/detalleVenta/${ventaId}`; 
        const {data:detalles} = await axios.get(url);
        const resultado = safeParse(DetallesVentasSchema, detalles.data); // <-- Cambia aquí
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

import { safeParse } from "valibot";
import { DetallesVentasSchema, IngresoVentaSchema, VentasSchema } from '../types/ventas';
import axios from "../services/axiosInstance";

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
        const url = `http://localhost:4000/api/borrar-venta/${ventaId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar la venta" };
    }
}

export async function elimDetalleVenta(detalleId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/borrar-detalleVenta/${detalleId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el detalle de venta" };
    }
}

export async function editarVenta(ventaId: number) 
{
    try
    {        
        const url = `http://localhost:4000/api/editar-venta/${ventaId}`;        
        await axios.put(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo devolver la venta" };
    }
}

export async function añadirVenta3(formData: IngresarVentaData ) 
{
    try
    {
        const resultado = safeParse(IngresoVentaSchema, formData);
        if (resultado.success) 
        {            
            
            const url = `http://localhost:4000/api/crear-venta`;
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
        return { success: false, error: "No se pudo ingresar la Venta" };
    }
}

export async function getDetalleVentas(ventaId: number) 
{    
    try
    {
        const url = `http://localhost:4000/api/detalleVenta/${ventaId}`; 
        const {data:detalles} = await axios.get(url);
        const resultado = safeParse(DetallesVentasSchema, detalles.data); 
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
type IngresarVentaData = {
    [k: string]: FormDataEntryValue;
};
type DetalleVentaInput = {
    id_producto: number;
    cantidad: number;
    precio: number;
};

export async function añadirVenta(detalles: DetalleVentaInput[]) {
    try {
        if (!detalles || detalles.length === 0) {
            return { success: false, error: "Debe agregar al menos un producto" };
        }

        console.log("Creando venta con detalles:", detalles);

        // 1) Crear la venta
        const urlVenta = `http://localhost:4000/api/crear-venta`;
        const resVenta = await axios.post(urlVenta, { 
            fecha_venta: new Date().toISOString() 
        });
        
        const ventaId = resVenta.data?.data?.id_venta || resVenta.data?.id_venta;
        if (!ventaId) {
            return { success: false, error: "No se pudo crear la venta" };
        }

        console.log("Venta creada con ID:", ventaId);

        // 2) Crear detalles
        console.log("Creando detalles de venta...");
        const urlDetalle = `http://localhost:4000/api/crear-detalleVenta`;
        
        for (const detalle of detalles) {
            if (detalle.id_producto && detalle.cantidad) {
                const dataDetalle = {
                    id_venta: ventaId,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                };
                console.log("Insertando detalle:", dataDetalle);
                await axios.post(urlDetalle, dataDetalle);
            }
        }

        return { success: true, data: { id_venta: ventaId } };

    } catch (error: any) {
        console.error("Error en crearVenta:", error);
        return { 
            success: false, 
            error: error.response?.data?.error || "No se pudo crear la venta" 
        };
    }
}
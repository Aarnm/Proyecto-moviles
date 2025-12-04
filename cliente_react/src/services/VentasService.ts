import { safeParse } from "valibot";
import { DetallesVentasSchema, VentasSchema } from '../types/ventas';
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

export async function elimDetalleVenta(detalleId: number) {
    try {
        const url = `http://localhost:4000/api/borrar-detalleVenta/${detalleId}`;
        await axios.delete(url);
        return { success: true };
    }
    catch (error) {
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

        const urlVenta = `http://localhost:4000/api/crear-venta`;
        const resVenta = await axios.post(urlVenta, { 
            fecha_venta: new Date().toISOString() 
        });
        
        const ventaId = resVenta.data?.data?.id_venta || resVenta.data?.id_venta;
        if (!ventaId) {
            return { success: false, error: "No se pudo crear la venta" };
        }

        console.log("Venta creada con ID:", ventaId);

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

export async function agregarDetallesVenta(ventaId: number, detalles: DetalleVentaInput[]) {
    try {
        if (!detalles || detalles.length === 0) {
            return { success: false, error: "Debe agregar al menos un producto" };
        }

        console.log("Agregando detalles a venta", ventaId, ":", detalles);

        // Crear detalles
        const urlDetalle = `http://localhost:4000/api/crear-detalleVenta`;
        let precioTotalVenta = 0;
        
        for (const detalle of detalles) {
            if (detalle.id_producto && detalle.cantidad) {
                const subtotal = detalle.cantidad * detalle.precio;
                precioTotalVenta += subtotal;

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

        // Actualizar precio_total de la venta (suma de todos los detalles)
        console.log("Actualizando precio total de venta");
        const urlUpdateVenta = `http://localhost:4000/api/editar-venta/${ventaId}`;
        await axios.put(urlUpdateVenta, { precio_total: precioTotalVenta });

        return { success: true, data: { id_venta: ventaId } };

    } catch (error: any) {
        console.error("Error en agregarDetallesAVenta:", error);
        return { 
            success: false, 
            error: error.response?.data?.error || "No se pudo agregar los detalles" 
        };
    }
}
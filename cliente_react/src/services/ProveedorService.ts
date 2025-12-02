import axios from "axios";
import { AñadirProveedorSchema, ProveedoresSchema } from "../types/proveedor";
import { safeParse } from "valibot";

export async function getProveedor() {
    try {
        const url = `http://localhost:4000/api/proveedor`; //cambiar url con el router de api
        const {data:proveedor} = await axios.get(url);
        const resultado = safeParse(ProveedoresSchema, proveedor.data);
        if (resultado.success) 
        {
            return resultado.output;
        } 
        else 
        {
            throw new Error("Ocurrio un problema al solicitar los datos");
        }   
    } catch (error) {
        console.error("Error al obtener proveedores: ", error);
        return [];
    }
}

type AñadirProveedorData =
{
    [k:string]: FormDataEntryValue
}

export async function AñadirProveedorForm(formData: AñadirProveedorData ) 
{
    try
    {
        const resultado = safeParse(AñadirProveedorSchema, formData);
        if (resultado.success) 
        {            
            const url = `http://localhost:4000/api/crear-proveedor`;
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
        return { success: false, error: "No se pudo añadir al proveedor" };
    }
}

export async function elimProveedor(proveedorId: number) 
{
    try
    {
        const url = `http://localhost:4000/api/borrar-proveedor/${proveedorId}`;        
        await axios.delete(url);        
        return { success: true };
    }
    catch (error)
    {
        return { success: false, error: "No se pudo eliminar el proveedor" };
    }
}
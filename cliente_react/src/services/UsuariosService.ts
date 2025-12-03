import { safeParse } from "valibot";
import { CambioContrasennaSchema, LoginFormSchema } from "../types/usuarios";
import axios from '../services/axiosInstance';

type UsuarioFormData = 
{
    [k:string]: FormDataEntryValue
}

export async function login(formData: UsuarioFormData) 
{
    try
    {
        const resultado = safeParse(LoginFormSchema, formData);
                
        if (resultado.success) 
        {
            const url = `http://localhost:4000/api/login`; 
            const {data} = await axios.post(url, resultado.output);
            localStorage.setItem('token', data.token);            
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
    catch (error: any) 
    {
        return{
            success: false,
            error: error.response?.data?.error ?? 'Error inesperado',
        }    
    }  
}

export async function crearUsuario(formData: UsuarioFormData) 
{
    try
    {
        const resultado = safeParse(LoginFormSchema, formData);
        if (resultado.success) 
        {
            const url = `/usuario/crear`;
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
        return { success: false, error: "No se pudo crear el usuario" };
    }
}

type CambiarContraseñaFormData = 
{
    [k:string]: FormDataEntryValue
}

//el cambiar de api ya sabe que es email

export async function cambiarPassword(formData: CambiarContraseñaFormData) 
{
    try
    {   
        const email = localStorage.getItem('emailLocal');
        if (!email) {
            return { success: false, error: "No hay email en sesión" };
        }
        
        formData.email = email;
        console.log("El email es: " + formData.email);
        const resultado = safeParse(CambioContrasennaSchema, formData);
                
        if (!resultado.success)
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
        else
        {
            const url = `/usuario/cambiar-password`;

            await axios.patch(url, resultado.output);

            return {success: true};
        } 
    }
    catch (error)
    {
        return { success: false, error: "No se pudo cambiar la contraseña" };
    }
}
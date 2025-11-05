import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import { login } from "../services/UsuariosService";

export async function action({request}: ActionFunctionArgs)
{    
    const formData = Object.fromEntries(await request.formData());
    const resultado = await login(formData); //Poner aqui nueva function de UsuariosService

    if (!resultado.success)
        {
            return resultado;
        }
    return redirect('/');
}

export default function Login() 
{
    const actionData = useActionData() as 
    {
      success?: boolean 
      error?: string 
      detalleErrores: { [key: string]: string[] }
    };
    
    return(
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">                        
                        <div className="card px-sm-2 px-0">
                            <div className="card-body">                                            
                                <p className="app-brand-text demo card-title fw-bold text-primary mb-3">Automotora Don Juanito</p>
                                {/* Div de error */}
                                {
                                    actionData?.error &&                   
                                    <div className="alert alert-danger " >{actionData?.error}</div>
                                }
                                <Form id="formAuthentication" className="mb-6"  method="POST">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input className={`form-control ${actionData?.detalleErrores?.email ?`is-invalid` : ''}`} type="text" id="email" name="email" placeholder="donpepe@example.com"/>
                                        {'email' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.email[0]} </div>)}
                                    </div>                                    
                                    <div className="mb-6 form-password-toggle">
                                        <label className="form-label" htmlFor="password">Contraseña</label>
                                        <div className="input-group input-group-merge">
                                        <input
                                        type="password"
                                        id="password"
                                        className={`form-control ${actionData?.detalleErrores?.password ?`is-invalid` : ''}`} 
                                        name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"/>
                                        {'password' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.password[0]} </div>)}                          
                                        </div>                                        
                                    </div>                
                                    <div className="mb-6">
                                        <button className="btn btn-primary d-grid w-100" type="submit">Iniciar sesión</button>
                                    </div>
                                </Form>              
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    )
}
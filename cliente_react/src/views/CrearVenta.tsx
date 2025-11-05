import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import { useRef } from "react";
import { añadirVenta } from "../services/VentasService";

export async function action({request}: ActionFunctionArgs)
{
    const formData = Object.fromEntries(await request.formData());
    const resultado = await añadirVenta(formData);

    if (!resultado.success)
    {
        return resultado;
    } 
    return redirect('/');
}

export default function CrearVenta() {
    const actionData = useActionData() as 
    {
      success?: boolean 
      error?: string 
      detalleErrores: { [key: string]: string[] }
    };

    //Para resetear
    const formRef = useRef<HTMLFormElement | null>(null) ;
    const handleReset = () => 
    {
      formRef.current?.reset();
    }

    return ( 
        <>
            <div className="container-xxl flex-grow-1 container-p-y">                  
              <div className="card mb-6">                
                <div className="card-body pt-4">
                  <h5 className="card-title text-primary mb-3">Crear una nueva venta</h5>

                  {/* Div de error */}
                  {actionData?.error &&                   
                    <div className="alert alert-danger " >{actionData?.error}</div>
                  }
                  <Form id="formAccountSettings" method="POST" ref={formRef}>
                    <div className="row g-6">                         
                      <div className="col-md-6">                        
                        {/* Producto */}
                        <label htmlFor="producto" className="form-label">Id del producto</label>
                        <input className={`form-control ${actionData?.detalleErrores?.producto ?`is-invalid` : ''}`} type="text" id="producto" name="producto" placeholder="101" />
                        {'producto' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.producto[0]} </div>)}                        
                      </div>  
                      
                      {/* Cantidad */}                      
                      <div className="col-md-6">                        
                        <label htmlFor="cantidad" className="form-label">Cantindad</label>
                        <input className={`form-control ${actionData?.detalleErrores?.cantidad ?`is-invalid` : ''}`} type="text" id="cantidad" name="cantidad" placeholder="999" />  
                        {'cantidad' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.cantidad[0]} </div>)}                                              
                      </div>
                    </div> 
                    <div className="mt-6">
                      <button type="submit" className="btn me-3 btn-success">Crear venta</button>                      
                      <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                      
                    </div>                     
                  </Form>
                </div>
              </div>                  
            </div>
        </>
    )
}
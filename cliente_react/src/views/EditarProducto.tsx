import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import { ingreArriendo } from "../services/ArriendosService";
import { useRef } from "react";

export async function action({request}: ActionFunctionArgs)
{
    const formData = Object.fromEntries(await request.formData());
    const resultado = await ingreArriendo(formData);

    if (!resultado.success)
    {
        return resultado;
    } 
    return redirect('/');
}

export default function RegistrarArriendo() {
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
                  <h5 className="card-title text-primary mb-3">Ingresa un nuevo producto</h5>

                  {/* Div de error */}
                  {actionData?.error &&                   
                    <div className="alert alert-danger " >{actionData?.error}</div>
                  }
                  <Form id="formAccountSettings" method="POST" ref={formRef}>
                    <div className="row g-6">                         
                      <div className="col-md-6">                        
                        {/* Patente vehiculo */}
                        <label htmlFor="patenteVehiculo" className="form-label">Nombre</label>
                        <input className={`form-control ${actionData?.detalleErrores?.patenteVehiculo ?`is-invalid` : ''}`} type="text" id="patenteVehiculo" name="patenteVehiculo" placeholder="Joya verde" />
                        {'patenteVehiculo' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.patenteVehiculo[0]} </div>)}                        
                      </div>  
                      
                      {/* Tipo vehiculo "combobox"*/}                      
                      <div className="col-md-6">                        
                        <label htmlFor="tipoVehiculo" className="form-label">Stock</label>
                        <input className={`form-control ${actionData?.detalleErrores?.patenteVehiculo ?`is-invalid` : ''}`} type="text" id="patenteVehiculo" name="patenteVehiculo" placeholder="999" />  
                        {'patenteVehiculo' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.patenteVehiculo[0]} </div>)}                                              
                      </div>           
                      {/* Rut cliente */}
                      <div className="col-md-6">
                        <label htmlFor="rutCliente" className="form-label">Precio</label>
                        <input className={`form-control ${actionData?.detalleErrores?.rutCliente ?`is-invalid` : ''}`} type="text" id="rutCliente" name="rutCliente" placeholder="999990"/>
                        {'rutCliente' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.rutCliente[0]} </div>)}                                              
                      </div>         
                      {/* Nombre Cliente   */}
                      <div className="col-md-6">
                        <label htmlFor="nombreCliente" className="form-label">Rut del proveedor</label>
                        <input className={`form-control ${actionData?.detalleErrores?.nombreCliente ?`is-invalid` : ''}`} type="text" id="nombreCliente" name="nombreCliente" placeholder="XXXXXXXX-X" />
                        {'nombreCliente' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.nombreCliente[0]} </div>)}                                              
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="nombreCliente" className="form-label">Descripción</label>
                        <input className={`form-control ${actionData?.detalleErrores?.nombreCliente ?`is-invalid` : ''}`} type="text" id="nombreCliente" name="nombreCliente" placeholder="Joya verde con correa ligera" />
                        {'nombreCliente' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.nombreCliente[0]} </div>)}                                              
                      </div>                                                                                                                       
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="btn me-3 btn-success">Añadir producto</button>                      
                      <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                      
                    </div>
                  </Form>
                </div>
              </div>                  
            </div>
        </>
    )
}
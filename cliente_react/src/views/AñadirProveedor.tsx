import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { AñadirProveedorForm } from "../services/ProveedorService";

// Action
export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());
    console.log("Datos que llegan al backend:", formData);

    const resultado = await AñadirProveedorForm(formData);

    if (!resultado.success) {
        return resultado;
    }

    return redirect('/');
}

export default function AñadirProveedor() {
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
                  <h5 className="card-title text-primary mb-3">Añadir Proveedor</h5>

                  {/* Div de error */}
                  {actionData?.error &&                   
                    <div className="alert alert-danger " >{actionData?.error}</div>
                  }
                  <Form id="formAccountSettings" method="POST" ref={formRef}>
                    <div className="row g-6">                         
                      <div className="col-md-6">                        
                        {/* Patente vehiculo */}
                        <label htmlFor="rut_proveedor" className="form-label">Rut</label>
                        <input className={`form-control ${actionData?.detalleErrores?.rut_proveedor ?`is-invalid` : ''}`} type="text" id="rut_proveedor" name="rut_proveedor" placeholder="171229914" />
                        {'rut_proveedor' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.rut_proveedor[0]} </div>)}                        
                      </div>  
                      
                      {/* Tipo vehiculo "combobox"*/}                      
                      <div className="col-md-6">                        
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input className={`form-control ${actionData?.detalleErrores?.nombre ?`is-invalid` : ''}`} type="text" id="nombre" name="nombre" placeholder="Joyas Brillantes S.A." />  
                        {'nombre' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.nombre[0]} </div>)}                                              
                      </div>           
                      {/* Rut cliente */}
                      <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Telefono</label>
                        <input className={`form-control ${actionData?.detalleErrores?.telefono ?`is-invalid` : ''}`} type="text" id="telefono" name="telefono" placeholder="999990"/>
                        {'telefono' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.telefono[0]} </div>)}                                              
                      </div>         
                      {/* Nombre Cliente   */}
                      <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input className={`form-control ${actionData?.detalleErrores?.direccion ?`is-invalid` : ''}`} type="text" id="direccion" name="direccion" placeholder="Los Carrera 410" />
                        {'direccion' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.direccion[0]} </div>)}                                              
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input className={`form-control ${actionData?.detalleErrores?.correo ?`is-invalid` : ''}`} type="text" id="correo" name="correo" placeholder="Joyasbri@gmail.com" />
                        {'correo' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.correo[0]} </div>)}                                              
                      </div>                                                                                                                    
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="btn me-3 btn-success">Añadir Proveedor</button>                      
                      <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                    
                    </div>
                  </Form>
                </div>
              </div>                  
            </div>
        </>
    )
}
import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom";
import { useRef, useState } from "react";
import { editarProveedor, getProveedorById } from "../services/ProveedorService";
import type { Proveedor } from "../types/proveedor";

export async function loader({params}: LoaderFunctionArgs) {
  const id = params.id;
  if (!id)
    throw new Response('Proveedor ID no proporcionado en la URL', {status:400});
  
  const proveedor = await getProveedorById(Number(id));
  if (!proveedor)
    throw new Response('Proveedor no encontrado', {status:404});
  
  return { proveedor };
}

// Action
export async function action({ request, params }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());
    console.log("Datos que llegan al backend:", formData);

    const proveedorId = Number(params.id);

    const resultado = await editarProveedor(formData as any, proveedorId);

    if (!resultado.success) {
        return resultado;
    }

    return redirect('/proveedores/ver');
}

export default function EditarProveedor() {
    const actionData = useActionData() as 
    {
      success?: boolean 
      error?: string 
      detalleErrores: { [key: string]: string[] }
    };

    // Protege contra undefined
    const data = useLoaderData() as { proveedor?: Proveedor } | undefined;
    const proveedor = data?.proveedor;

    // Inicializa con valores del proveedor cargado
    const [proveedorRut, setProveedorRut] = useState(proveedor?.rut_proveedor?.toString() ?? "");
    const [proveedorNombre, setProveedorNombre] = useState(proveedor?.nombre ?? "");
    const [proveedorTelefono, setProveedorTelefono] = useState(proveedor?.telefono ?? "");
    const [proveedorDireccion, setProveedorDireccion] = useState(proveedor?.direccion ?? "");
    const [proveedorCorreo, setProveedorCorreo] = useState(proveedor?.correo ?? "");

    //Para resetear
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
      formRef.current?.reset();
    }

    return ( 
        <>
            <div className="container-xxl flex-grow-1 container-p-y">                  
              <div className="card mb-6">                
                <div className="card-body pt-4">
                  <h5 className="card-title text-primary mb-3">Editar Proveedor</h5>

                  {/* Div de error */}
                  {actionData?.error &&                   
                    <div className="alert alert-danger">{actionData?.error}</div>
                  }
                  <Form id="formAccountSettings" method="POST" ref={formRef}>
                    <div className="row g-6">                         
                      <div className="col-md-6">                        
                        {/* Rut Proveedor */}
                        <label htmlFor="rut_proveedor" className="form-label">Rut</label>
                        <input 
                          className={`form-control ${actionData?.detalleErrores?.rut_proveedor ? `is-invalid` : ''}`} 
                          type="text" 
                          id="rut_proveedor" 
                          name="rut_proveedor" 
                          placeholder="171229914" 
                          value={proveedorRut}
                          onChange={e => setProveedorRut(e.target.value)}
                        />
                        {'rut_proveedor' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.rut_proveedor[0]}</div>)}                        
                      </div>  
                      
                      {/* Nombre */}                      
                      <div className="col-md-6">                        
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input 
                          className={`form-control ${actionData?.detalleErrores?.nombre ? `is-invalid` : ''}`} 
                          type="text" 
                          id="nombre" 
                          name="nombre" 
                          placeholder="Joyas Brillantes S.A." 
                          value={proveedorNombre} 
                          onChange={e => setProveedorNombre(e.target.value)}
                        />  
                        {'nombre' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.nombre[0]}</div>)}                                              
                      </div>           
                      {/* Telefono */}
                      <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Telefono</label>
                        <input 
                          className={`form-control ${actionData?.detalleErrores?.telefono ? `is-invalid` : ''}`} 
                          type="text" 
                          id="telefono" 
                          name="telefono" 
                          placeholder="999990" 
                          value={proveedorTelefono} 
                          onChange={e => setProveedorTelefono(e.target.value)}
                        />
                        {'telefono' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.telefono[0]}</div>)}                                              
                      </div>         
                      {/* Dirección */}
                      <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input 
                          className={`form-control ${actionData?.detalleErrores?.direccion ? `is-invalid` : ''}`} 
                          type="text" 
                          id="direccion" 
                          name="direccion" 
                          placeholder="Los Carrera 410" 
                          value={proveedorDireccion} 
                          onChange={e => setProveedorDireccion(e.target.value)}
                        />
                        {'direccion' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.direccion[0]}</div>)}                                              
                      </div>
                      {/* Correo */}
                      <div className="col-md-6">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input 
                          className={`form-control ${actionData?.detalleErrores?.correo ? `is-invalid` : ''}`} 
                          type="text" 
                          id="correo" 
                          name="correo" 
                          placeholder="Joyasbri@gmail.com" 
                          value={proveedorCorreo} 
                          onChange={e => setProveedorCorreo(e.target.value)}
                        />
                        {'correo' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.correo[0]}</div>)}                                              
                      </div>                                                                                                                    
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="btn me-3 btn-success">Guardar Cambios</button>                      
                      <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                    
                    </div>
                  </Form>
                </div>
              </div>                  
            </div>
        </>
    )
}
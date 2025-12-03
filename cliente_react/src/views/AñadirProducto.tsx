import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { añadirProducto } from "../services/ProductosService";
import { getProveedor } from "../services/ProveedorService";
import type { Proveedor } from "../types/proveedor";

// Loader
export async function loader() {
    return await getProveedor();
}

// Action
export async function action({ request }: ActionFunctionArgs) {
    const formDataRaw = Object.fromEntries(await request.formData());
    console.log("Datos crudos del form:", formDataRaw);

    // Envía tal cual como strings — el backend convertirá
    const formData = {
        id_producto: String(formDataRaw.id),
        rut_proveedor: String(formDataRaw.rut_proveedor),
        nombre: String(formDataRaw.nombre),
        precio: String(formDataRaw.precio),
        stock: String(formDataRaw.stock),
        descripcion: String(formDataRaw.desc),
    };
    // Castea al tipo esperado (o define un tipo ProductoForm si prefieres)
    const resultado = await añadirProducto(formData as any);

    if (!resultado.success) {
        return resultado;
    }

    return redirect('/');
}

export default function AñadirProducto() {

    const actionData = useActionData() as {
        success?: boolean;
        error?: string;
        detalleErrores: { [key: string]: string[] };
    };  

    // Protege contra undefined
    const proveedorIni = useLoaderData() as Proveedor[] | undefined;

    const [proveedor, setProductos] = useState<Proveedor[]>(proveedorIni ?? []);
    const [loading, setLoading] = useState((proveedorIni ?? []).length === 0);

    useEffect(() => {
        if ((proveedorIni ?? []).length === 0) {
            setLoading(true);
            getProveedor()
                .then(p => setProductos(p ?? []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [proveedorIni]);

    // Reset
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
        formRef.current?.reset();
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y">                  
            <div className="card mb-6">                
                <div className="card-body pt-4">
                    <h5 className="card-title text-primary mb-3">Crear un nuevo producto</h5>

                    {/* Div de error */}
                  {actionData?.error &&                   
                    <div className="alert alert-danger">{actionData?.error}</div>
                  }
                  <Form id="formAccountSettings" method="POST" ref={formRef}>
                    <div className="row g-6">  
                      {/* Id*/}                       
                      <div className="col-md-6">                        
                        <label htmlFor="id" className="form-label">Id</label>
                        <input className={`form-control ${actionData?.detalleErrores?.id ?`is-invalid` : ''}`} type="text" id="id" name="id" placeholder="Anillo con diamante" />  
                        {'id' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.id[0]} </div>)}                                              
                      </div> 
                      {/* Proveedor */}
                    <div className="col-md-6">
                        <label htmlFor="proveedor" className="form-label">Proveedor</label>
                        <select
                            className="form-select"
                            id="proveedor"
                            name="rut_proveedor"
                            defaultValue=""
                            disabled={loading || proveedor.length === 0}
                        >
                        {loading && <option value="">Cargando...</option>}
                        {!loading && proveedor.length === 0 &&
                        <option value="">No hay proveedores disponibles</option>
                        }

                        {!loading && proveedor.length > 0 &&
                        <>
                        <option value="">Seleccione proveedor...</option>
                        {proveedor.map(p => (
                        <option key={p.rut_proveedor} value={p.rut_proveedor}>
                        {p.rut_proveedor} - {p.nombre}
                        </option>
                        ))}
                        </>
                        }
                        </select>
                        {actionData?.detalleErrores?.rut_proveedor && (
                        <div className="invalid-feedback d-block">{actionData?.detalleErrores?.rut_proveedor[0]}</div>
                        )} 
                    </div>
                      
                      {/* Nombre*/}                      
                      <div className="col-md-6">                        
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input className={`form-control ${actionData?.detalleErrores?.nombre ?`is-invalid` : ''}`} type="text" id="nombre" name="nombre" placeholder="Anillo con diamante" />  
                        {'nombre' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.nombre[0]} </div>)}                                              
                      </div>           
                      {/* Precio */}
                      <div className="col-md-6">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input className={`form-control ${actionData?.detalleErrores?.precio ?`is-invalid` : ''}`} type="text" id="precio" name="precio" placeholder="100000"/>
                        {'precio' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.precio[0]} </div>)}                                              
                      </div>         
                      {/* Stock */}
                      <div className="col-md-6">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input className={`form-control ${actionData?.detalleErrores?.stock ?`is-invalid` : ''}`} type="text" id="stock" name="stock" placeholder="50" />
                        {'stock' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.stock[0]} </div>)}                                              
                      </div>
                      {/* Desc */}
                      <div className="col-md-6">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <input className={`form-control ${actionData?.detalleErrores?.descripcion ?`is-invalid` : ''}`} type="text" id="descripcion" name="descripcion" placeholder="Descripción del producto" />
                        {'descripcion' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback"> {actionData?.detalleErrores?.descripcion[0]} </div>)}                                              
                      </div>                                                                                                                    
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="btn me-3 btn-success">Añadir Producto</button>                      
                      <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                    
                    </div>
                  </Form>
                </div>
            </div>
        </div>
    );
}
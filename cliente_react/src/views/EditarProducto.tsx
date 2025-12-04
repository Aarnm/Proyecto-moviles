import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { editarProducto, getProductosById } from "../services/ProductosService";
import { getProveedor } from "../services/ProveedorService";
import type { Proveedor } from "../types/proveedor";
import type { Productos } from "../types/productos";

// Loader
export async function loader({params}: LoaderFunctionArgs) {
  const id = params.id;
  if (!id)
    throw new Response('Producto ID no proporcionado en la URL', {status:400});
  
  const producto = await getProductosById(Number(id));
  if (!producto)
    throw new Response('Producto no encontrado', {status:404});
  
  const proveedores = await getProveedor();
  
  return { proveedores, producto };
}

// Action
export async function action({ request, params }: ActionFunctionArgs) {
    const formDataRaw = Object.fromEntries(await request.formData());
    console.log("Datos crudos del form:", formDataRaw);

    const productoId = Number(params.id);

    const formData = {
        id_producto: String(formDataRaw.id_producto),
        rut_proveedor: String(formDataRaw.rut_proveedor),
        nombre: String(formDataRaw.nombre),
        precio: String(formDataRaw.precio),
        stock: String(formDataRaw.stock),
        desc: String(formDataRaw.desc),
    };

    const resultado = await editarProducto(formData as any, productoId);

    if (!resultado.success) {
        return resultado;
    }

    return redirect('/productos/ver');
}

export default function EditarProducto() {

    const actionData = useActionData() as {
        success?: boolean;
        error?: string;
        detalleErrores: { [key: string]: string[] };
    };  

    // Llamar useLoaderData UNA SOLA VEZ
    const data = useLoaderData() as { proveedores?: Proveedor[]; producto?: Productos } | undefined;
    const proveedoresIni = data?.proveedores ?? [];
    const productoIni = data?.producto;

    const [proveedor, setProveedor] = useState(proveedoresIni);
    const [loading, setLoading] = useState(proveedoresIni.length === 0);
    const [productoId, setProductoId] = useState(productoIni?.id_producto ?? "");
    const [productoRutProveedor, setRutProveedor] = useState(productoIni?.rut_proveedor ?? "");
    const [productoNombre, setNombreProducto] = useState(productoIni?.nombre ?? "");
    const [productoPrecio, setPrecioProducto] = useState(productoIni?.precio?.toString() ?? "");
    const [productoStock, setStockProducto] = useState(productoIni?.stock?.toString() ?? "");
    const [productoDesc, setDescProducto] = useState(productoIni?.desc ?? "");

    useEffect(() => {
        if (proveedoresIni.length === 0) {
            setLoading(true);
            getProveedor()
                .then(p => setProveedor(p ?? []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [proveedoresIni]);

    // Reset
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
        formRef.current?.reset();
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y">                  
            <div className="card mb-6">                
                <div className="card-body pt-4">
                    <h5 className="card-title text-primary mb-3">Editar producto</h5>

                    {actionData?.error &&                   
                        <div className="alert alert-danger">{actionData?.error}</div>
                    }
                    <Form id="formAccountSettings" method="POST" ref={formRef}>
                        <div className="row g-6">  
                          {/* Id */}                      
                            <div className="col-md-6">                        
                                <label htmlFor="id_producto" className="form-label">Id</label>
                                <input className={`form-control ${actionData?.detalleErrores?.id_producto ? `is-invalid` : ''}`} type="text" id="id_producto" name="id_producto" placeholder="Anillo con diamante" value={productoId} />  
                                {'id_producto' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.id_producto[0]}</div>)}                                              
                            </div>                        
                            {/* Proveedor */}
                            <div className="col-md-6">
                                <label htmlFor="proveedor" className="form-label">Proveedor</label>
                                <select
                                    className="form-select"
                                    id="proveedor"
                                    name="rut_proveedor"
                                    value={productoRutProveedor}
                                    onChange={e => setRutProveedor(e.target.value)}
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
                            
                            {/* Nombre */}                      
                            <div className="col-md-6">                        
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input className={`form-control ${actionData?.detalleErrores?.nombre ? `is-invalid` : ''}`} type="text" id="nombre" name="nombre" placeholder="Anillo con diamante" value={productoNombre} onChange={e => setNombreProducto(e.target.value)} />  
                                {'nombre' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.nombre[0]}</div>)}                                              
                            </div>           
                            {/* Precio */}
                            <div className="col-md-6">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input className={`form-control ${actionData?.detalleErrores?.precio ? `is-invalid` : ''}`} type="text" id="precio" name="precio" placeholder="100000" value={productoPrecio} onChange={e => setPrecioProducto(e.target.value)}/>
                                {'precio' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.precio[0]}</div>)}                                              
                            </div>         
                            {/* Stock */}
                            <div className="col-md-6">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input className={`form-control ${actionData?.detalleErrores?.stock ? `is-invalid` : ''}`} type="text" id="stock" name="stock" placeholder="50" value={productoStock} onChange={e => setStockProducto(e.target.value)}/>
                                {'stock' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.stock[0]}</div>)}                                              
                            </div>
                            {/* Descripción */}
                            <div className="col-md-6">
                                <label htmlFor="desc" className="form-label">Descripción</label>
                                <input className={`form-control ${actionData?.detalleErrores?.desc ? `is-invalid` : ''}`} type="text" id="desc" name="desc" placeholder="Descripción del producto" value={productoDesc} onChange={e => setDescProducto(e.target.value)}/>
                                {'desc' in (actionData?.detalleErrores || {}) && (<div className="invalid-feedback">{actionData?.detalleErrores?.desc[0]}</div>)}                                              
                            </div>                                                                                                                    
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="btn me-3 btn-success">Guardar cambios</button>                      
                            <button type="button" className="btn btn-primary me-3" onClick={handleReset}>Restablecer</button>                    
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { añadirCompra } from "../services/ComprasService";
import { getProductos } from "../services/ProductosService";
import { getProveedor } from "../services/ProveedorService";
import type { Productos } from "../types/productos";
import type { Proveedor } from "../types/proveedor";
import CrearCompraFilaNuevo from "../components/CrearCompraFilaNuevo";
import CrearCompraFilaExistente from "../components/CrearCompraFilaExistente";

// Loader
export async function loader() {
    const [productos, proveedores] = await Promise.all([
        getProductos(),
        getProveedor()
    ]);
    return { productos, proveedores };
}

// Action
export async function action({ request }: ActionFunctionArgs) {
    const formDataRaw = await request.formData();
    const formData = Object.fromEntries(formDataRaw);
    console.log("Datos que llegan al action:", formData);

    try {
        // Obtener datos básicos
        const rut_proveedor = Number(formData.rut_proveedor);
        const fecha = formData.fecha as string;

        if (!rut_proveedor || !fecha) {
            return { success: false, error: "Debe seleccionar un proveedor y una fecha" };
        }

        // Extraer detalles de compra diferenciando tipo
        const detalles: Array<{ 
            id_producto: number; 
            nombre?: string;
            rut_proveedor?: number;
            precio: number; 
            cantidad: number;
            desc?: string;
        }> = [];
        // Productos nuevos
        Object.entries(formData).forEach(([key, value]) => {
            const match = key.match(/nuevo_id_producto\[(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const id_producto = Number(value);
                const nombre = formData[`nuevo_nombre[${idx}]`] as string || undefined;
                const precio = Number(formData[`nuevo_precio[${idx}]`] || 0);
                const cantidad = Number(formData[`nuevo_cantidad[${idx}]`] || 0);
                const desc = formData[`nuevo_desc[${idx}]`] as string || undefined;
                if (id_producto && cantidad > 0 && precio > 0 && nombre) {
                    detalles.push({
                        id_producto,
                        nombre,
                        rut_proveedor,
                        precio,
                        cantidad,
                        desc
                    });
                }
            }
        });
        // Productos existentes
        Object.entries(formData).forEach(([key, value]) => {
            const match = key.match(/existente_producto\[(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const id_producto = Number(value);
                const precio = Number(formData[`existente_precio[${idx}]`] || 0);
                const cantidad = Number(formData[`existente_cantidad[${idx}]`] || 0);
                if (id_producto && cantidad > 0 && precio > 0) {
                    detalles.push({
                        id_producto,
                        precio,
                        cantidad
                    });
                }
            }
        });

        if (detalles.length === 0) {
            return { success: false, error: "Debe agregar al menos un producto" };
        }

        const resultado = await añadirCompra({
            rut_proveedor,
            fecha,
            detalles
        });

        if (!resultado.success) {
            return resultado;
        }
        return redirect('/compras/ver');
    } catch (error) {
        console.error("Error en action:", error);
        return { success: false, error: "Error al crear compra" };
    }
}

export default function CrearCompra() {

    const actionData = useActionData() as {
        success?: boolean;
        error?: string;
        detalleErrores?: { [key: string]: string[] };
    };

    const loaderData = useLoaderData() as {
        productos?: Productos[];
        proveedores?: Proveedor[];
    };

    const [productos, setProductos] = useState<Productos[]>(loaderData.productos ?? []);
    const [proveedores, setProveedores] = useState<Proveedor[]>(loaderData.proveedores ?? []);
    const [loading, setLoading] = useState((loaderData.productos ?? []).length === 0);

    // Detalles de compra dinámicos
    const [detalles, setDetalles] = useState([{ tipo: "existente", id: 0 }]); // tipo: 'nuevo' o 'existente'

    useEffect(() => {
        if ((loaderData.productos ?? []).length === 0) {
            setLoading(true);
            Promise.all([getProductos(), getProveedor()])
                .then(([p, prov]) => {
                    setProductos(p ?? []);
                    setProveedores(prov ?? []);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [loaderData]);

    const agregarDetalle = (tipo: "nuevo" | "existente") => {
        setDetalles(prev => [...prev, { tipo, id: prev.length > 0 ? Math.max(...prev.map(d => d.id)) + 1 : 0 }]);
    };

    const eliminarDetalle = (id: number) => {
        setDetalles(prev => prev.filter(d => d.id !== id));
    };

    // Reset
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
        formRef.current?.reset();
        setDetalles([{ tipo: "existente", id: 0 }]); // vuelves a un solo detalle
    };

    // Obtener fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">                  
            <div className="card mb-6">                
                <div className="card-body pt-4">
                    <h5 className="card-title text-primary mb-3">Crear una nueva compra</h5>

                    {actionData?.error && (
                        <div className="alert alert-danger">{actionData.error}</div>
                    )}

                    <Form method="POST" ref={formRef}>
                        
                        {/* Datos de la compra */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label">Proveedor *</label>
                                <select
                                    className="form-select"
                                    name="rut_proveedor"
                                    defaultValue=""
                                    required
                                    disabled={loading || proveedores.length === 0}
                                >
                                    {loading && <option value="">Cargando...</option>}
                                    {!loading && proveedores.length === 0 &&
                                        <option value="">No hay proveedores</option>
                                    }
                                    {!loading && proveedores.length > 0 &&
                                        <>
                                            <option value="">Seleccione un proveedor...</option>
                                            {proveedores.map(p => (
                                                <option key={p.rut_proveedor} value={p.rut_proveedor}>
                                                    {p.nombre} - RUT: {p.rut_proveedor}
                                                </option>
                                            ))}
                                        </>
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Fecha *</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    defaultValue={fechaActual}
                                    required
                                />
                            </div>
                        </div>

                        <hr className="my-4" />
             

                        {/* detalles dinámicos */}
                        {detalles.map((detalle) => (
                            detalle.tipo === "nuevo" ? (
                                <CrearCompraFilaNuevo
                                    key={detalle.id}
                                    index={detalle.id}
                                    onDelete={() => eliminarDetalle(detalle.id)}
                                />
                            ) : (
                                <CrearCompraFilaExistente
                                    key={detalle.id}
                                    index={detalle.id}
                                    productos={productos}
                                    loading={loading}
                                    onDelete={() => eliminarDetalle(detalle.id)}
                                />
                            )
                        ))}

                        {/* botones para agregar tipo de detalle */}
                        <div className="d-flex gap-2 mb-3">
                            <button type="button" className="btn btn-success" onClick={() => agregarDetalle("nuevo")}>+ Producto nuevo</button>
                            <button type="button" className="btn btn-info" onClick={() => agregarDetalle("existente")}>+ Producto existente</button>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-success me-3">Crear compra</button>
                            <button type="button" className="btn btn-primary" onClick={handleReset}>Restablecer</button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}

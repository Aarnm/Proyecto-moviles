import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { añadirCompra } from "../services/ComprasService";
import { getProductos } from "../services/ProductosService";
import { getProveedor } from "../services/ProveedorService";
import type { Productos } from "../types/productos";
import type { Proveedor } from "../types/proveedor";
import CrearCompraFila from "../components/CrearCompraFila";

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

        // Extraer detalles de compra
        const detalles: Array<{ 
            id_producto: number; 
            nombre?: string;
            rut_proveedor?: number;
            precio: number; 
            cantidad: number;
            desc?: string;
        }> = [];
        
        Object.entries(formData).forEach(([key, value]) => {
            const match = key.match(/id_producto\[(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const idProducto = Number(value);
                const nombre = formData[`nombre[${idx}]`] as string || undefined;
                const precio = Number(formData[`precio[${idx}]`] || 0);
                const cantidad = Number(formData[`cantidad[${idx}]`] || 0);
                const desc = formData[`desc[${idx}]`] as string || undefined;
                
                if (idProducto && cantidad > 0 && precio > 0) {
                    detalles.push({
                        id_producto: idProducto,
                        nombre,
                        rut_proveedor,
                        precio,
                        cantidad,
                        desc
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
    const [detalles, setDetalles] = useState([0]); // un detalle por defecto

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

    const agregarDetalle = () => {
        setDetalles(prev => [...prev, prev.length]);
    };

    const eliminarDetalle = (i: number) => {
        setDetalles(prev => prev.filter(idx => idx !== i));
    };

    // Reset
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
        formRef.current?.reset();
        setDetalles([0]); // vuelves a un solo detalle
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
                        {detalles.map((i) => (
                            <CrearCompraFila
                                key={i}
                                index={i}
                                productos={productos}
                                loading={loading}
                                errorIdProducto={actionData?.detalleErrores?.[`id_producto.${i}`]?.[0]}
                                errorPrecio={actionData?.detalleErrores?.[`precio.${i}`]?.[0]}
                                errorCantidad={actionData?.detalleErrores?.[`cantidad.${i}`]?.[0]}
                                onDelete={() => eliminarDetalle(i)}
                            />
                        ))}

                        {/* botón agregar detalle */}
                        <button type="button" className="btn btn-info mb-3" onClick={agregarDetalle}>
                            + Agregar producto
                        </button>

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

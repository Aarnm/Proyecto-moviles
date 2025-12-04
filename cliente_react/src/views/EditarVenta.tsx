import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { agregarDetallesVenta, getDetalleVentas } from "../services/VentasService";
import { getProductos } from "../services/ProductosService";
import CrearVentaFila from "../components/CrearVentaFila";
import type { Productos } from "../types/productos";
import type { DetallesVentas } from "../types/ventas";

// Loader
export async function loader({ params }: LoaderFunctionArgs) {
    const ventaId = Number(params.id);
    if (!ventaId) {
        throw new Response('ID de venta no proporcionado', { status: 400 });
    }

    // Obtener productos y detalles existentes
    const [productos, detallesExistentes] = await Promise.all([
        getProductos(),
        getDetalleVentas(ventaId)
    ]);

    return { 
        ventaId,
        productos: productos ?? [],
        detallesExistentes: detallesExistentes ?? []
    };
}

// Action
export async function action({ request, params }: ActionFunctionArgs) {
    const ventaId = Number(params.id);
    const formDataRaw = await request.formData();
    const formData = Object.fromEntries(formDataRaw);
    console.log("Datos que llegan al action:", formData);

    try {
        // Obtener productos para consultar precios
        const productos = await getProductos();
        const productoMap = new Map(productos?.map(p => [p.id_producto, p.precio]) ?? []);

        // Extraer y calcular precios de NUEVOS detalles
        const detalles: Array<{ id_producto: number; cantidad: number; precio: number }> = [];
        
        Object.entries(formData).forEach(([key, value]) => {
            const match = key.match(/producto\[(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const idProducto = Number(value);
                const cantidad = Number(formData[`cantidad[${idx}]`] || 0);
                const precioProducto = productoMap.get(idProducto) || 0;
                
                if (idProducto && cantidad && precioProducto) {
                    detalles.push({
                        id_producto: idProducto,
                        cantidad,
                        precio: precioProducto,
                    });
                }
            }
        });

        if (detalles.length === 0) {
            return { success: false, error: "Debe agregar al menos un producto" };
        }

        // Llamar a función que agrega detalles a venta existente
        const resultado = await agregarDetallesVenta(ventaId, detalles);
        if (!resultado.success) {
            return resultado;
        }
        return redirect(`/ventas/${ventaId}/editar`); // Recarga la misma página
    } catch (error) {
        console.error("Error en action:", error);
        return { success: false, error: "Error al agregar detalles" };
    }
}

export default function EditarVenta() {

    const actionData = useActionData() as {
        success?: boolean;
        error?: string;
        detalleErrores?: { [key: string]: string[] };
    };

    const data = useLoaderData() as { ventaId: number; productos?: Productos[]; detallesExistentes?: DetallesVentas[] } | undefined;
    
    const ventaId = data?.ventaId ?? 0;
    const productosIni = data?.productos ?? [];
    const detallesExistentes = data?.detallesExistentes ?? [];

    const [productos, setProductos] = useState<Productos[]>(productosIni);
    const [loading, setLoading] = useState(productosIni.length === 0);
    const [detalles, setDetalles] = useState([0]);
    const [erroresStock, setErroresStock] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (productosIni.length === 0) {
            setLoading(true);
            getProductos()
                .then(p => setProductos(p ?? []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [productosIni]);

    // Validar stock cuando cambien productos o cantidades
    const validarStock = () => {
        const nuevoErrores: { [key: number]: string } = {};
        const formElement = document.querySelector('form');
        
        if (formElement) {
            detalles.forEach((index) => {
                const productoSelect = formElement.querySelector(
                    `select[name="producto[${index}]"]`
                ) as HTMLSelectElement;
                const cantidadInput = formElement.querySelector(
                    `input[name="cantidad[${index}]"]`
                ) as HTMLInputElement;

                if (productoSelect && cantidadInput) {
                    const idProducto = Number(productoSelect.value);
                    const cantidad = Number(cantidadInput.value || 0);
                    
                    if (idProducto && cantidad) {
                        const producto = productos.find(p => p.id_producto === idProducto);
                        
                        if (producto && cantidad > producto.stock) {
                            nuevoErrores[index] = `Stock disponible: ${producto.stock}`;
                        }
                    }
                }
            });
        }

        setErroresStock(nuevoErrores);
        return Object.keys(nuevoErrores).length === 0;
    };

    const eliminarDetalle = (i: number) => {
        setDetalles(prev => prev.filter(idx => idx !== i));
        const nuevosErrores = { ...erroresStock };
        delete nuevosErrores[i];
        setErroresStock(nuevosErrores);
    };

    const formRef = useRef<HTMLFormElement | null>(null);
    const handleReset = () => {
        formRef.current?.reset();
        setDetalles([0]);
        setErroresStock({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (!validarStock()) {
            e.preventDefault();
            // Sin alert, solo previene el envío
        }
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y">                  
            <div className="card mb-6">                
                <div className="card-body pt-4">
                    <h5 className="card-title text-primary mb-3">Agregar detalles a la venta #{ventaId}</h5>

                    {actionData?.error && (
                        <div className="alert alert-danger">{actionData.error}</div>
                    )}

                    {actionData?.success && (
                        <div className="alert alert-success">¡Detalles agregados exitosamente!</div>
                    )}

                    {/* Mostrar detalles existentes */}
                    {detallesExistentes.length > 0 && (
                        <div className="mb-4">
                            <h6>Detalles existentes:</h6>
                            <table className="table table-sm">
                                <thead className="table-light">
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detallesExistentes.map((det) => (
                                        <tr key={det.id_producto}>
                                            <td>{det.id_producto}</td>
                                            <td>{det.cantidad}</td>
                                            <td>${det.precio}</td>
                                            <td>${(det.cantidad * det.precio).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <hr />

                    <h6>Agregar nuevos detalles:</h6>

                    <Form method="POST" ref={formRef} onSubmit={handleSubmit}>
                        
                        {/* detalles dinámicos para agregar */}
                        {detalles.map((i) => (
                            <div key={i} className="mb-3">
                                <CrearVentaFila
                                    index={i}
                                    productos={productos}
                                    loading={loading}
                                    errorProducto={actionData?.detalleErrores?.[`producto.${i}`]?.[0]}
                                    errorCantidad={actionData?.detalleErrores?.[`cantidad.${i}`]?.[0]}
                                    onDelete={() => eliminarDetalle(i)}
                                />
                                
                                {/* Error visual de stock - sin emoji */}
                                {erroresStock[i] && (
                                    <div className="alert alert-warning mt-2 mb-0" style={{fontSize: "0.9rem"}}>
                                        Stock disponible: {erroresStock[i].replace('Stock disponible: ', '')}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="mt-4">
                            <button 
                                type="submit" 
                                className="btn btn-success me-3"
                                disabled={Object.keys(erroresStock).length > 0}
                            >
                                Agregar detalles
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleReset}
                            >
                                Limpiar
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}
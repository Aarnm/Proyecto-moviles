import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { añadirVenta } from "../services/VentasService";
import { getProductos } from "../services/ProductosService";
import type { Productos } from "../types/productos";
import CrearVentaFila from "../components/CrearVentaFila";

// Loader
export async function loader() {
    return await getProductos();
}

// Action
export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());
    console.log("Datos que llegan al backend:", formData);

    const resultado = await añadirVenta(formData);

    if (!resultado.success) {
        return resultado;
    }

    return redirect('/ventas/ver');
}

export default function CrearVenta() {

    const actionData = useActionData() as {
        success?: boolean;
        error?: string;
        detalleErrores: { [key: string]: string[] };
    };

    const productosIni = useLoaderData() as Productos[];

    const [productos, setProductos] = useState<Productos[]>(productosIni ?? []);
    const [loading, setLoading] = useState(productosIni.length === 0);

    // Cargar productos si no vinieron del loader
    useEffect(() => {
        if (productosIni.length === 0) {
            setLoading(true);
            getProductos()
                .then(p => setProductos(p ?? []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [productosIni]);

    // Detalles de venta dinámicos
    const [detalles, setDetalles] = useState([0]); // un detalle por defecto

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

    return (
        <div className="container-xxl flex-grow-1 container-p-y">                  
            <div className="card mb-6">                
                <div className="card-body pt-4">
                    <h5 className="card-title text-primary mb-3">Crear una nueva venta</h5>

                    {actionData?.error && (
                        <div className="alert alert-danger">{actionData.error}</div>
                    )}

                    <Form method="POST" ref={formRef}>
                        
                        {/* detalles dinámicos */}
                        {detalles.map((i) => (
                            <CrearVentaFila
                                key={i}
                                index={i}
                                productos={productos}
                                loading={loading}
                                errorProducto={actionData?.detalleErrores?.[`producto.${i}`]?.[0]}
                                errorCantidad={actionData?.detalleErrores?.[`cantidad.${i}`]?.[0]}
                                onDelete={() => eliminarDetalle(i)}
                            />
                        ))}

                        {/* botón agregar detalle */}
                        <button type="button" className="btn btn-info mb-3" onClick={agregarDetalle}>
                            + Agregar detalle
                        </button>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-success me-3">Crear venta</button>
                            <button type="button" className="btn btn-primary" onClick={handleReset}>Restablecer</button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}
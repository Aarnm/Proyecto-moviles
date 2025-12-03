import type { Productos } from "../types/productos";

type DetalleVentaProps = {
    index: number;
    productos: Productos[];
    loading: boolean;
    errorProducto?: string;
    errorCantidad?: string;
    onDelete: () => void;
};

export default function CrearVentaFila({index, productos, loading, errorProducto, errorCantidad, onDelete}: DetalleVentaProps) {
    return (
        <div className="row g-3 align-items-end mb-3">
            
            {/* Producto */}
            <div className="col-md-6">
                <label className="form-label">Producto</label>
                <select
                    className={`form-select ${errorProducto ? "is-invalid" : ""}`}
                    name={`producto[${index}]`}
                    defaultValue=""
                    disabled={loading || productos.length === 0}
                >
                    {loading && <option value="">Cargando...</option>}
                    {!loading && productos.length === 0 &&
                        <option value="">No hay productos</option>
                    }

                    {!loading && productos.length > 0 &&
                        <>
                            <option value="">Seleccione...</option>
                            {productos.map(p => (
                                <option key={p.id_producto} value={p.id_producto}>
                                    {p.id_producto} - {p.nombre} - ${p.precio}
                                </option>
                            ))}
                        </>
                    }
                </select>
                {errorProducto && (
                    <div className="invalid-feedback">{errorProducto}</div>
                )}
            </div>

            {/* Cantidad */}
            <div className="col-md-4">
                <label className="form-label">Cantidad</label>
                <input
                    type="number"
                    min="1"
                    className={`form-control ${errorCantidad ? "is-invalid" : ""}`}
                    name={`cantidad[${index}]`}
                    placeholder="999"
                />
                {errorCantidad && (
                    <div className="invalid-feedback">{errorCantidad}</div>
                )}
            </div>

            {/* Botón eliminar */}
            <div className="col-md-2">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    X
                </button>
            </div>
        </div>
    );
}
import type { Productos } from "../types/productos";

type DetalleCompraProps = {
    index: number;
    productos: Productos[];
    loading: boolean;
    errorIdProducto?: string;
    errorPrecio?: string;
    errorCantidad?: string;
    onDelete: () => void;
};

export default function CrearCompraFila({
    index, 
    errorIdProducto, 
    errorPrecio,
    errorCantidad, 
    onDelete
}: DetalleCompraProps) {
    return (
        <div className="row g-3 align-items-end mb-3 border-bottom pb-3">
            
            {/* ID Producto */}
            <div className="col-md-2">
                <label className="form-label">ID Producto *</label>
                <input
                    type="number"
                    min="1"
                    className={`form-control ${errorIdProducto ? "is-invalid" : ""}`}
                    name={`id_producto[${index}]`}
                    placeholder="1234"
                    required
                />
                {errorIdProducto && (
                    <div className="invalid-feedback">{errorIdProducto}</div>
                )}
            </div>

            {/* Nombre (opcional) */}
            <div className="col-md-3">
                <label className="form-label">Nombre (opcional)</label>
                <input
                    type="text"
                    className="form-control"
                    name={`nombre[${index}]`}
                    placeholder="Nombre del producto"
                />
                <small className="text-muted">Solo si es producto nuevo</small>
            </div>

            {/* Precio */}
            <div className="col-md-2">
                <label className="form-label">Precio *</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`form-control ${errorPrecio ? "is-invalid" : ""}`}
                    name={`precio[${index}]`}
                    placeholder="1000"
                    required
                />
                {errorPrecio && (
                    <div className="invalid-feedback">{errorPrecio}</div>
                )}
            </div>

            {/* Cantidad */}
            <div className="col-md-2">
                <label className="form-label">Cantidad *</label>
                <input
                    type="number"
                    min="1"
                    className={`form-control ${errorCantidad ? "is-invalid" : ""}`}
                    name={`cantidad[${index}]`}
                    placeholder="10"
                    required
                />
                {errorCantidad && (
                    <div className="invalid-feedback">{errorCantidad}</div>
                )}
            </div>

            {/* Descripción (opcional) */}
            <div className="col-md-2">
                <label className="form-label">Descripción</label>
                <input
                    type="text"
                    className="form-control"
                    name={`desc[${index}]`}
                    placeholder="Opcional"
                />
            </div>

            {/* Botón eliminar */}
            <div className="col-md-1">
                <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={onDelete}
                    title="Eliminar producto"
                >
                    X
                </button>
            </div>
        </div>
    );
}

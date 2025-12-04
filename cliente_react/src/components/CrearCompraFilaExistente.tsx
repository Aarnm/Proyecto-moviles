import type { Productos } from "../types/productos";

import { useState } from "react";

type Props = {
    index: number;
    productos: Productos[];
    loading: boolean;
    onDelete: () => void;
};

export default function CrearCompraFilaExistente({ index, productos, loading, onDelete }: Props) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const productoSeleccionado = productos.find(p => p.id_producto === selectedId);

    return (
        <div className="card mb-3 border">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-5">
                        <label className="form-label">Producto existente</label>
                        <select
                            className="form-select"
                            name={`existente_producto[${index}]`}
                            required
                            disabled={loading || productos.length === 0}
                            value={selectedId ?? ""}
                            onChange={e => setSelectedId(Number(e.target.value))}
                        >
                            {loading && <option value="">Cargando...</option>}
                            {!loading && productos.length === 0 && <option value="">No hay productos</option>}
                            {!loading && productos.length > 0 && <>
                                <option value="">Seleccione...</option>
                                {productos.map(p => (
                                    <option key={p.id_producto} value={p.id_producto}>{p.id_producto} - {p.nombre} - ${p.precio}</option>
                                ))}
                            </>}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productoSeleccionado ? productoSeleccionado.precio : ""}
                            disabled
                            tabIndex={-1}
                            readOnly
                        />
                        {/* Input hidden para enviar el precio al backend */}
                        <input
                            type="hidden"
                            name={`existente_precio[${index}]`}
                            value={productoSeleccionado ? productoSeleccionado.precio : ""}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Cantidad</label>
                        <input type="number" min="1" className="form-control" name={`existente_cantidad[${index}]`} required />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="button" className="btn btn-danger w-100" onClick={onDelete}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

type Props = {
    index: number;
    onDelete: () => void;
};

export default function CrearCompraFilaNuevo({ index, onDelete }: Props) {
    return (
        <div className="card mb-3 border">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">ID Producto Nuevo</label>
                        <input type="number" min="1" className="form-control" name={`nuevo_id_producto[${index}]`} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name={`nuevo_nombre[${index}]`} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Precio</label>
                        <input type="number" min="0" step="0.01" className="form-control" name={`nuevo_precio[${index}]`} required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Cantidad</label>
                        <input type="number" min="1" className="form-control" name={`nuevo_cantidad[${index}]`} required />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="button" className="btn btn-danger w-100" onClick={onDelete}>Eliminar</button>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Descripción (opcional)</label>
                        <textarea className="form-control" name={`nuevo_desc[${index}]`} rows={2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

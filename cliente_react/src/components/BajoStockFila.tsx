import type { Productos } from "../types/productos";

type BajoStockFilaProps = {
    index: number,
    producto: Productos
};

export default function BajoStockFila({ index, producto }: BajoStockFilaProps) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{producto.id_producto}</td>
            <td>{producto.nombre}</td>
            <td
                style={{
                    color: producto.stock < 10 ? "red" : "orange",
                    fontWeight: "bold"
                }}
            >
                {producto.stock}
            </td>
        </tr>
    );
}
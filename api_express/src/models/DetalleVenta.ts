import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from "sequelize-typescript";
import Venta from "./Venta";
import Producto from "./Producto";

@Table({ tableName: 'detalle_venta' })
class DetalleVenta extends Model {

  // Clave foránea que hace referencia a la venta
  @ForeignKey(() => Venta)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare id_venta: number;

  // Clave foránea que hace referencia al producto (Esta es la línea que faltaba)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
    @ForeignKey(() => Producto)
  declare id_producto: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cantidad: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare precio: number;

  // Relación inversa: Un detalle de venta pertenece a un producto
  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default DetalleVenta;
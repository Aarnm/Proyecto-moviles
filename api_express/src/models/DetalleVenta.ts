import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from "sequelize-typescript";
import Venta from "./Venta";
import Producto from "./Producto";

@Table({ tableName: 'detalle_venta' })
class DetalleVenta extends Model {

  // Clave foránea que hace referencia a la venta
  @ForeignKey(() => Venta)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare id_venta: number;

  // Clave foránea que hace referencia al producto
  @ForeignKey(() => Producto)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare id_producto: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cantidad: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare precio: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare subtotal: number;
  
  // Relación: Un detalle de venta pertenece a una venta
  @BelongsTo(() => Venta)
  declare venta: Venta;

  // Relación: Un detalle de venta pertenece a un producto
  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default DetalleVenta;
import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from "sequelize-typescript";
import Compra from "./Compra";
import Producto from "./Producto";

@Table({ tableName: 'detalle_compra' })
class DetalleCompra extends Model {

  // Clave foránea que hace referencia a la compra
  @ForeignKey(() => Compra)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare id_compra: number;

  // Clave foránea que hace referencia al producto
  @ForeignKey(() => Producto)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  declare id_producto: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare cantidad: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare precio: number;

  // Relación: Un detalle de compra pertenece a una compra
  @BelongsTo(() => Compra)
  declare compra: Compra;

  // Relación: Un detalle de compra pertenece a un producto
  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default DetalleCompra;
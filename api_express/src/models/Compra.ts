import { Column, DataType, ForeignKey, HasMany, BelongsTo, Model, Table } from "sequelize-typescript";
import Proveedor from "./Proveedor";
import DetalleCompra from "./DetalleCompra";


@Table({ tableName: 'compra' })
class Compra extends Model {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  declare id_compra: number;

  @ForeignKey(() => Proveedor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare rut_proveedor: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare fecha: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, field: 'precio_total' })
  declare total: number;

  // Relación: Una compra pertenece a un proveedor
  @BelongsTo(() => Proveedor)
  declare proveedor: Proveedor;

  // Relación: Una compra tiene muchos detalles de compra
  @HasMany(() => DetalleCompra)
  declare detallesCompra: DetalleCompra[];
}

export default Compra;
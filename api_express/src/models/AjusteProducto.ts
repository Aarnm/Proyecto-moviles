import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";

@Table({ tableName: 'ajuste_producto' })
class AjusteProducto extends Model {

  @Column({ type: DataType.INTEGER, primaryKey: true, allowNull: false })
  declare id_mod: number;

  // Clave foránea que hace referencia al producto que se está ajustando
  @ForeignKey(() => Producto)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id_producto: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare stock: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare precio: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare fecha: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  declare desc: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare motivo: string;

  // Relación: Un ajuste de producto pertenece a un producto
  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default AjusteProducto;
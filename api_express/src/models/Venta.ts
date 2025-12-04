import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import DetalleVenta from "./DetalleVenta";

@Table({ tableName: 'ventas' })
class Venta extends Model {

  @Column({ type: DataType.INTEGER, primaryKey: true, allowNull: false,autoIncrement: true  })
  declare id_venta: number;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare fecha_venta: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare total: number;

  //Relación: Una venta tiene muchos detalles de venta
   @HasMany(() => DetalleVenta)
   declare detallesVenta: DetalleVenta[];
}

export default Venta;
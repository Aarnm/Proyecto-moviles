// Archivo: Producto.ts

import { Column, DataType, ForeignKey, HasMany, BelongsTo, Model, Table } from "sequelize-typescript";
import Proveedor from "./Proveedor";
import DetalleVenta from "./DetalleVenta";
import DetalleCompra from "./DetalleCompra";
import AjusteProducto from "./AjusteProducto";

@Table({ tableName: 'productos' })
class Producto extends Model {

  @Column({ type: DataType.INTEGER, primaryKey: true, allowNull: false })
  declare id_producto: number;

  @ForeignKey(() => Proveedor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare rut_proveedor: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare precio: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare stock: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare desc: string;

  // Relación: Un producto pertenece a un proveedor
  @BelongsTo(() => Proveedor)
  declare proveedor: Proveedor;

  // Relaciones: Un producto puede estar en muchos detalles de venta, detalles de compra y ajustes
  @HasMany(() => DetalleVenta)
  declare detallesVenta: DetalleVenta[];

  @HasMany(() => DetalleCompra)
  declare detallesCompra: DetalleCompra[];

  @HasMany(() => AjusteProducto)
  declare ajustesProducto: AjusteProducto[];
}

export default Producto;
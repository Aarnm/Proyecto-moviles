import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Producto from "./Producto";
import Compra from "./Compra";

@Table({ tableName: 'proveedor' })
class Proveedor extends Model {

  @Column({ type: DataType.INTEGER, primaryKey: true, allowNull: false })
  declare rut_proveedor: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare telefono: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare direccion: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare correo: string;

  // Relaciones: Un proveedor puede tener muchos productos y muchas compras
  @HasMany(() => Producto)
  declare productos: Producto[];

  @HasMany(() => Compra)
  declare compras: Compra[];
}

export default Proveedor;
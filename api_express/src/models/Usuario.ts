import bcrypt from 'bcrypt'
import {  Column, IsEmail, Model,  Table,DataType, BeforeCreate } from 'sequelize-typescript';


@Table({tableName:'usuarios'})
class Usuario extends Model{
    @Column({type: DataType.STRING(50),primaryKey:true,allowNull:false,validate: {IsEmail} })
    declare email: string

    @Column({type: DataType.STRING(100),allowNull: false})
    declare password: string


    @BeforeCreate
    static async hashPassword(usuario: Usuario){
        usuario.password = await bcrypt.hash(usuario.password, 10)
    }

}

export default Usuario
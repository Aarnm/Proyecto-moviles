import { request, Request,Response } from "express"
import Usuario from '../models/Usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const login = async(request: Request, response:Response) =>{
    const {email,password} = request.body
    const SECRET = process.env.SECRET_KEY

    try{
        const usuario = await Usuario.findByPk(email)

        if(!usuario || !bcrypt.compareSync(password,usuario.password)){
            response.status(401).json({error:'Credenciales incorrectos'})
        }

        const token = jwt.sign({email:usuario.email},SECRET,{expiresIn:'2h'})
        response.json({token})
        

    }catch (error){
        console.error('Error de login: ', error)
        response.status(500).json({error: 'Error interno'})
    }
}

//falta
export const crearUsuario = async (request: Request,response:Response)=>{
   const {email,password} = request.body
   if(!email||!password){
    response.status(400).json({error:'Email y password son obligatorios'})
   }
   try{
        

   }catch (error){
     console.error('Error al registrar al usuario:',error)
     response.status(500).json({error:'Error interno'})
   }
}
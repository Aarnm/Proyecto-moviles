import { Request,Response } from "express"
import Usuario from '../models/Usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const login = async(request: Request, response:Response) =>{
    const {email,password} = request.body
    const SECRET = process.env.SECRET_KEY

    try{
        const usuario = await Usuario.findByPk(email)

        if(!usuario || !bcrypt.compareSync(password,usuario.password)){
            return response.status(401).json({error:'Credenciales incorrectos'})
        }

        const token = jwt.sign({email:usuario.email},SECRET,{expiresIn:'2h'})
        return response.json({token})
        

    }catch (error){
        console.error('Error de login: ', error)
        return response.status(500).json({error: 'Error interno'})
    }
}

// Registrar nuevo usuario
export const crearUsuario = async (request: Request,response:Response)=>{
   const {email,password} = request.body
   
  
   if(!email || !password){
     response.status(400).json({error:'Email y password son obligatorios'})
   }
   

   try{
        // Verificar si el usuario ya existe
        const existente = await Usuario.findByPk(email)
        if(existente){
             response.status(409).json({error:'Este usuario ya está registrado'})
        }
        
        // Crear nuevo usuario (el password se hashea automáticamente con @BeforeCreate)
        const nuevoUsuario = await Usuario.create({email, password})
        
        return response.status(201).json({
            message:'Usuario creado correctamente',
            usuario: { email: nuevoUsuario.email }
        })
   }catch (error){
     console.error('Error al registrar al usuario:', error)
     response.status(500).json({error:'Error interno al registrar'})
   }
}
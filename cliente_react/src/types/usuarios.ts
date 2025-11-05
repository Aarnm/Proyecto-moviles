import { nonEmpty, object, pipe, string, maxLength, email, minLength, nullable, custom } from "valibot";

export const LoginFormSchema = object
(
  {
    email: pipe(string(), nonEmpty('El email no puede estar vacio'), email('Correo no valido.'), maxLength(50, 'El correo no puede contener más de 50 digitos')),  
    password: pipe(string(), nonEmpty('La contraseña no puede estar vacia'), minLength(6, 'La contraseña no puede tener menos de 6 caracteres'), maxLength(60, 'La contraseña no puede contener más de 60 digitos')),  
  }
);

export const CambioContrasennaSchema = pipe(
  object(
    {
      email: nullable(string()),
      password: pipe(string(), nonEmpty('La contraseña no puede estar vacía'), minLength(6, 'La contraseña no puede tener menos de 6 caracteres'), maxLength(60, 'La contraseña no puede contener más de 60 dígitos')),
      passN: pipe(string(), nonEmpty('La nueva contraseña no puede estar vacía'), minLength(6, 'La nueva contraseña no puede tener menos de 6 caracteres'), maxLength(60, 'La nueva contraseña no puede contener más de 60 dígitos')),
      passNC: pipe(string(), nonEmpty('La confirmación no puede estar vacía'), maxLength(60, 'La confirmación no puede contener más de 60 dígitos')),
    }
  ),
  custom(
    (data) => {
      const d = data as { passN: string; passNC: string };
      return d.passN === d.passNC;
    },
    'La confirmación de la contraseña no coincide'
  )
);
import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter no minimo 3 caracter").max(50),
  email: z.string().email("Email precisar ser valido"),
  password: z.string().min(6).max(50),
  passwordConfirmation: z.string().min(6).max(50),
  birthday: z.date(),
  emergencynumber: z.string().min(10).max(11),
  gender: z.string().min(1).max(1),
})

export type UserSchema = z.infer<typeof userSchema>

// username: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().required().min(6),
//   passwordConfirmation: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "As senhas nao sao iguais")
//     .required(),
//   birthday: yup.date().required(),
//   emergencynumber: yup
//     .string()
//     .required()
//     .matches(phoneRegExp, "Numero de telefone invalido")
//     .max(11, "Numero de telefone invalido muito grande"),
//   gender: yup.string().required(),
//   name: yup.string().required(),

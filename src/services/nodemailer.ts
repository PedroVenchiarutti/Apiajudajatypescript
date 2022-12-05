import { BadRequestError } from "@/helpers/api_errors"
import nodemailer from "nodemailer"
import { Transporter } from "nodemailer"

interface IMail {
  to: string
  from: string
  subject: string
  text: string
}

class Mail {
  constructor(
    public to: string,
    public subject: string,
    public message: string
  ) {}

  async wrapedSendMail(mailOptions: IMail) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT as unknown as number,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }) as Transporter

      // Envio de email para o usuario demora um pouco
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  }

  async sendMail() {
    // Configurando o servidor de email
    const mailOptions = {
      from: '"Fred Foo 👻" <pedro.lucas.clear@gmail.com>', // sender address
      to: this.to, // para onde quer envia pode ser um arry ou uma string
      subject: this.subject, // assunto
      text: this.message, // texto
    }

    return await this.wrapedSendMail(mailOptions)
  }
}

export default Mail

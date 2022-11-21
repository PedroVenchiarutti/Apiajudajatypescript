import bcrypt from "bcrypt"
import { IBcrypt } from "../entities/bcrypt"

//implements pode ser usada para verificar se uma classe está em conformidade com uma interface específica
export class BcryptService implements IBcrypt {
  // ...
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash)
    return result
  }

  async getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }
}

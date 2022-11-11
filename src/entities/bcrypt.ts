// Cirando uma interface para definir os metodos/funcao que poderao existir dentro da classe
export interface IBcrypt {
  hash: (password: string) => Promise<string>
  compare: (password: string, hash: string) => Promise<boolean>
  getHash: (password: string) => Promise<string>
}

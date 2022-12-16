import bcrypt from 'bcrypt'
const salt = bcrypt.genSaltSync(10)

export const hasPassword = (password: string) => {
  const encryptPassowrd = bcrypt.hashSync(password, salt)

  return encryptPassowrd
}

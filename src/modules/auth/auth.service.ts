import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { encrypt } from '@utils/encryption'

const prisma = new PrismaClient()

const login = async (email: string, password: string) => {
  const payload = { email, password }
  const findUser: any = await prisma.user.findUnique({
    where: { email },
    select: { password: true, email: true, id: true },
  })
  const userPassword = String(findUser?.password)
  const id = String(findUser?.id)
  const isValidPassword = bcrypt.compare(payload.password, userPassword)

  if (!isValidPassword)
    return null

  const secretKey = await encrypt(id)

  const token = jwt.sign({
    d: id,
  }, secretKey, { expiresIn: 60 * 60 })

  await prisma.user.update({
    where: { email },
    data: {
      token,
    },
  })

  return { token, secretKey }
}

export default {
  login,
}


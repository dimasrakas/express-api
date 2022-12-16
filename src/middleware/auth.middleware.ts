import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getToken } from '@utils/getToken'
import { PrismaClient } from '@prisma/client'
import { useError } from '@utils/useHttpResponse'

const prisma = new PrismaClient()

export const useAuthMiddleware = async function (req: Request, res: Response, next: NextFunction) {
  console.log('1. Auth Middleware Called')
  const authHeder = String(req.headers.authorization)
  const secretKey = String(req.headers['secret-key'])
  const token = String(getToken(authHeder))

  try {
    const decoded: any = jwt.verify(token, secretKey)
    console.log('decoded', decoded)
    const user = await prisma.user.findFirst({
      where: {
        email: 'dimasrakas@gmail.com',
        token,
      },
    })

    if (!user) {
      res.status(401)
      res.json(useError({ message: 'Not authorized', data: null }))

      return
    }
    else {
      req.body = { ...req.body, user }
    }
  }
  catch (err) {
    res.status(401)
    res.json(useError({ message: 'Not authorized karena error', data: null }))
    return
  }

  next()
}

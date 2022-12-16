import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import authService from '@modules/auth/auth.service'
import { validateLoginPayload } from '@modules/auth/auth.validator'
import { useError, useSuccess } from '@utils/useHttpResponse'
import { Prisma, PrismaClient } from '@prisma/client'
import { hasPassword } from '@utils/hashPassword'
import { omit } from '@utils/index'
const prisma = new PrismaClient()

export const handleLogin = async (req: Request, res: Response) => {
  const payload = req.body

  const validation = validateLoginPayload(payload)
  console.log(validation)

  if (!validation.success) {
    res.status(httpStatus.NOT_FOUND)
    return res.json(useError({ message: 'Something went wrong', data: null, error: validation.error }))
  }

  try {
    const result = await authService.login(payload.email, payload.password)

    if (!result) {
      res.status(httpStatus.NOT_FOUND)
      return res.json(useError({ message: 'Email / Password salah. Periksa kembali.', data: null }))
    }

    res.status(httpStatus.OK)
    return res.json(useSuccess({ message: 'Success', data: result }))
  }
  catch (error) {
    res.status(httpStatus.NOT_FOUND)
    res.json(useError({ message: 'Something went wrong', data: null }))
  }
}

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const isPasswordSame = req.body.password === req.body.confirmPassword

    if (!isPasswordSame) {
      return res.json(useError({ message: 'Password harus sama.' }))
    }

    const payload = {
      email: req.body.email,
      name: req.body.name,
      birthday: new Date(),
      password: hasPassword(req.body.password),
    }
    const result = await prisma.user.create({ data: payload })
    const final = omit(result, ['password', 'token'])

    res.json(useSuccess({ message: 'Success', data: final }))
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json(useError({ message: e.message, data: '' }))
    }
    throw new Error('Internal Server Error.')
  }
}


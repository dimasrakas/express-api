import type { Request, Response } from 'express'
import { useError, useSuccess } from '@utils/useHttpResponse'
import userService from '@modules/user/user.service'
import httpStatus from 'http-status'
import { omit } from '@utils/index'

export const getAllUser = async (req: Request, res: Response) => {
  try {
    console.log('Bodyxxx', req.query.perPage)
    const users = await userService.getAllUsers({ perPage: 10, page: 1 })
    const { data, meta } = users

    const exclude = data.map((item: any) => {
      const final = omit(item, ['password', 'token'])

      return final
    })

    res.status(httpStatus.OK)
    res.json(useSuccess({
      message: 'Success',
      data: exclude,
      meta,
    }))
  }
  catch (error) {
    res.status(httpStatus.NOT_FOUND)
    res.json(useError({ message: 'Error', data: null }))
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) | 0

  try {
    const user = await userService.getUserById(userId)

    res.status(httpStatus.OK)
    res.json(useSuccess({ message: 'Success', data: user }))
  }
  catch (error) {
    res.status(httpStatus.NOT_FOUND)
    res.json(useError({ message: 'Error', data: null }))
  }
}

export const updateUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) | 0
  const payload = req.body
  console.log(payload)

  try {
    const user = await userService.updateUserById(userId, payload)

    res.status(httpStatus.OK)
    res.json(useSuccess({ message: 'Success', data: user }))
  }
  catch (error) {
    res.status(httpStatus.NOT_FOUND)
    res.json(useError({ message: 'Error', data: null }))
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id) | 0

  try {
    const user = await userService.deleteUserById(userId)

    res.status(httpStatus.OK)
    res.json(useSuccess({ message: 'Success', data: user }))
  }
  catch (error) {
    res.status(httpStatus.NOT_FOUND)
    res.json(useError({ message: 'Error', data: null }))
  }
}

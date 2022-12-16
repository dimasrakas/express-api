import type { Request, Response } from 'express'
import { useSuccess } from '@utils/useHttpResponse'
import type { Prisma, SalesHeader } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { createPaginator } from '@utils/usePaginator'

const prisma = new PrismaClient()

export const getAllOrders = async (req: Request, res: Response) => {
  console.log(req.body)
  const paginate = createPaginator({ perPage: 10 })
  const result = await paginate<SalesHeader, Prisma.SalesHeaderFindManyArgs>(prisma.salesHeader, {}, { page: 20 })
  const { data, meta } = result

  return res.status(200).json(useSuccess({ message: 'getAllOrders', data, meta }))
}

export const getOrderById = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'getOrderById' }))
}

export const createOrder = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'createOrder' }))
}

export const updateOrderById = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'updateOrderById' }))
}

export const deleteOrderById = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'deleteOrderById' }))
}

import type { Request, Response } from 'express'
import { useSuccess } from '@utils/useHttpResponse'
import type { Prisma, SalesDetail } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { createPaginator } from '@utils/usePaginator'

const prisma = new PrismaClient()

export const getAllSalesItem = async (req: Request, res: Response) => {
  console.log(req.params)
  const paginate = createPaginator({ perPage: 50 })
  const result = await paginate<SalesDetail, Prisma.SalesDetailFindManyArgs>(prisma.salesDetail,
    { where: { salesId: 1 } },
    { page: 1 })
  const { data, meta } = result
  console.log(result)

  return res.status(200).json(useSuccess({ message: 'getAllSalesItem', data, meta }))
}

export const createSalesItem = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'createSalesItem' }))
}

export const updateSalesItemById = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'updateSalesItemById' }))
}

export const deleteSalesItemById = async (req: Request, res: Response) => {
  return res.status(200).json(useSuccess({ message: 'deleteSalesItemById' }))
}

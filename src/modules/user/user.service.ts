import type { Prisma, User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { createPaginator } from '@utils/usePaginator'
import { pick } from 'lodash'

const prisma = new PrismaClient()

interface getAllUsersArgs {
  perPage: number
  page: number
}

const getAllUsers = async ({ perPage = 10, page = 1 }: getAllUsersArgs) => {
  const paginate = createPaginator({ perPage })
  const result = await paginate<User, Prisma.UserFindManyArgs>(prisma.user, {}, { page })
  const { data, meta } = result

  return {
    data, meta,
  }
}

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      birthday: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return result
}

const updateUserById = async (id: number, payload: any) => {
  const allowedEdit = ['name']
  const data = pick(payload, allowedEdit)

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  })

  return result
}

const deleteUserById = async (id: number) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  })

  return deleteUser
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}


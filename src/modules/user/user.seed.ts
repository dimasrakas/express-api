import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const salt = bcrypt.genSaltSync(10)

export async function UserSeeding() {
  const total = 10
  const password = bcrypt.hashSync('1234', salt)
  const data: Prisma.UserCreateInput[] = Array.from({ length: total }).map(() => {
    return {
      email: faker.internet.email(),
      name: faker.name.fullName(),
      birthday: faker.datatype.datetime(),
      password,
    }
  })
  await prisma.user.createMany({
    data,
    skipDuplicates: true, // Skip 'Bobo'
  })

  await prisma.user.create({
    data: {
      email: 'dimasrakas@gmail.com',
      name: 'Dimas Raka Septiawan',
      birthday: new Date(),
      password,
    },
  })
}

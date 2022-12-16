import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function SalesSeeding() {
  const totalHeader = 200
  const data: Prisma.SalesHeaderCreateInput[] = Array.from({ length: totalHeader }).map(() => {
    return {
      date: new Date(),
      customerId: 123,
      customerName: faker.name.fullName(),
      taxType: 'NONE',
      taxPercent: 0,
      total: 123,
      grandTotal: 1234,
    }
  })
  await prisma.salesHeader.createMany({
    data,
    skipDuplicates: true,
  })

  const totalDetail = 25

  Array.from({ length: totalHeader }).forEach(async (val, index) => {
    const resultSalesDetail: Prisma.SalesDetailCreateInput[] = Array.from({ length: totalDetail }).map(() => {
      const quantity = faker.datatype.number({ max: 100 })
      const price = faker.datatype.number({ min: 50000, max: 5000000 })
      const total = quantity * price
      const discount = 0
      const grandTotal = total - discount

      return {
        salesId: index + 1,
        itemId: 2,
        itemName: faker.commerce.product(),
        itemThumbnail: faker.image.imageUrl(),
        quantity,
        unitName: 'pcs',
        price,
        discountType: 'AMOUNT',
        discount,
        total,
        grandTotal,
        updatedAt: new Date(),
      }
    })

    await prisma.salesDetail.createMany({
      data: resultSalesDetail,
      skipDuplicates: true,
    })
  })
}

import type { NextFunction, Request, Response } from 'express'

export const useMiddleware = async function (req: Request, res: Response, next: NextFunction) {
  console.log('0. Global Middleware Called')
  next()
}

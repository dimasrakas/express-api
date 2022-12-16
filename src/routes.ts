import express from 'express'
import authRoute from '@modules/auth/auth.routes'
import userRoute from '@modules/user/user.routes'
import salesRoute from '@modules/sales/sales.routes'

const router = express.Router()
router.use('/', [authRoute, userRoute, salesRoute])

export default router

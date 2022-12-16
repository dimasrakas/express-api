import express from 'express'
import { useAuthMiddleware } from '@middleware/auth.middleware'
import { deleteUserById, getAllUser, getUserById, updateUserById } from './user.controller'

const router = express.Router()
router.get('/user', useAuthMiddleware, getAllUser)
router.get('/user/:id', useAuthMiddleware, getUserById)
router.post('/user')
router.put('/user/:id', useAuthMiddleware, updateUserById)
router.delete('/user/:id', useAuthMiddleware, deleteUserById)

export default router

import express from 'express'
import { handleLogin, handleRegister } from '@modules/auth/auth.controller'

const router = express.Router()
router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/logout')
router.get('/me')
router.get('/forgot-password')
router.get('/reset-password')

export default router

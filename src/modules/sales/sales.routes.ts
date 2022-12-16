import express from 'express'
import { createOrder, deleteOrderById, getAllOrders, getOrderById, updateOrderById } from '@modules/sales/salesHeader.controller'
import { createSalesItem, deleteSalesItemById, getAllSalesItem, updateSalesItemById } from '@modules/sales/SalesItem.controller'

const router = express.Router()

router.get('/sales', getAllOrders)
router.get('/sales/:id', getOrderById)
router.post('/sales', createOrder)
router.put('/sales/:id', updateOrderById)
router.delete('/sales/:id', deleteOrderById)

router.get('/sales/:id/items', getAllSalesItem)
router.post('/sales/:id/items', createSalesItem)
router.put('/sales/:id/items/:itemId', updateSalesItemById)
router.delete('/sales/:id/items/:itemId', deleteSalesItemById)

export default router

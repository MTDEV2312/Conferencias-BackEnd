import {Router} from 'express'
import {RegisterBooking,GetBookings,GetBookingsById,UpdateBookings,DeleteBooking} from '../controllers/booking_controller.js'

const router= Router()

router.post('/bookings/register',RegisterBooking)
router.get('/bookings/',GetBookings)
router.get('/bookings/:codigo',GetBookingsById)
router.patch('/bookings/update/:id',UpdateBookings)
router.delete('/bookings/delete/:id',DeleteBooking)

export default router
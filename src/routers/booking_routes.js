import {Router} from 'express'
import {RegisterBooking,GetBookings,GetBookingsById,UpdateBookings,DeleteBooking} from '../controllers/booking_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router= Router()

router.post('/bookings/register',verifyJwt,RegisterBooking)
router.get('/bookings/',verifyJwt,GetBookings)
router.get('/bookings/:codigo',verifyJwt,GetBookingsById)
router.patch('/bookings/update/:id',verifyJwt,UpdateBookings)
router.delete('/bookings/delete/:id',verifyJwt,DeleteBooking)

export default router
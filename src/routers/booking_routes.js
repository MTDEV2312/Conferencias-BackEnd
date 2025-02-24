import {Router} from 'express'
import {RegisterBooking,GetBookings,GetBookingsById,UpdateBookings,DeleteBooking} from '../controllers/booking_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterBookingValidation,GetBookingByIdValidation,UpdateBookingValidation,DeleteBookingValidation} from '../helpers/booking_validation.js'

const router= Router()

router.post('/bookings/register',verifyJwt,RegisterBookingValidation,validateRequest,RegisterBooking)
router.get('/bookings/',verifyJwt,GetBookings)
router.get('/bookings/:codigo',verifyJwt,GetBookingByIdValidation,validateRequest,GetBookingsById)
router.patch('/bookings/update/:id',verifyJwt,UpdateBookingValidation,validateRequest,UpdateBookings)
router.delete('/bookings/delete/:id',verifyJwt,DeleteBookingValidation,validateRequest,DeleteBooking)

export default router
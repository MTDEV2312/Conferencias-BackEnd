import {Router} from 'express'
import {RegisterAuditorium,GetAuditoriums,GetAuditoriumsById,UpdateAuditorium,DeleteAuditorium} from '../controllers/auditorium_controller.js'

const router = Router()

router.post('/auditorium/register',RegisterAuditorium)
router.get('/auditorium/',GetAuditoriums)
router.get('/auditorium/:codigo',GetAuditoriumsById)
router.patch('/auditorium/update/:id',UpdateAuditorium)
router.delete('/auditorium/delete/:id',DeleteAuditorium)

export default router
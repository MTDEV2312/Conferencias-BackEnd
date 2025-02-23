import {Router} from 'express'
import {RegisterAuditorium,GetAuditoriums,GetAuditoriumsById,UpdateAuditorium,DeleteAuditorium} from '../controllers/auditorium_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/auditorium/register',verifyJwt,RegisterAuditorium)
router.get('/auditorium/',verifyJwt,GetAuditoriums)
router.get('/auditorium/:codigo',verifyJwt,GetAuditoriumsById)
router.patch('/auditorium/update/:id',verifyJwt,UpdateAuditorium)
router.delete('/auditorium/delete/:id',verifyJwt,DeleteAuditorium)

export default router
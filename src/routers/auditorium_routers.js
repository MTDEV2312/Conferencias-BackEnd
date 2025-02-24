import {Router} from 'express'
import {RegisterAuditorium,GetAuditoriums,GetAuditoriumsById,UpdateAuditorium,DeleteAuditorium} from '../controllers/auditorium_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterAuditoriumValidator,GetAuditoriumsByIdValidator,UpdateAuditoriumValidator,DeleteAuditoriumValidation} from '../helpers/auditorium_validation.js'

const router = Router()

router.post('/auditorium/register',verifyJwt,RegisterAuditoriumValidator,validateRequest,RegisterAuditorium)
router.get('/auditorium/',verifyJwt,GetAuditoriums)
router.get('/auditorium/:codigo',verifyJwt,GetAuditoriumsByIdValidator,validateRequest,GetAuditoriumsById)
router.patch('/auditorium/update/:id',verifyJwt,UpdateAuditoriumValidator,validateRequest,UpdateAuditorium)
router.delete('/auditorium/delete/:id',verifyJwt,DeleteAuditoriumValidation,validateRequest,DeleteAuditorium)

export default router
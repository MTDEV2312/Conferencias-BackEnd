import {Router} from 'express'
import {RegisterSpeaker,GetSpeakers,GetSpeakerById,UpdateSpeaker,DeleteSpeaker} from '../controllers/speakers_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterSpeakerValidator,GetSpeakerByIdValidator,UpdateSpeakerValidator,DeleteSpeakerValidator} from '../helpers/speaker_validation.js'

const router = Router()

router.post('/speakers/register',verifyJwt,RegisterSpeakerValidator,validateRequest,RegisterSpeaker)
router.get('/speakers/',verifyJwt,GetSpeakers)
router.get('/speakers/:cedula',verifyJwt,GetSpeakerByIdValidator,validateRequest,GetSpeakerById)
router.patch('/speakers/update/:id',verifyJwt,UpdateSpeakerValidator,validateRequest,UpdateSpeaker)
router.delete('/speakers/delete/:id',verifyJwt,DeleteSpeakerValidator,validateRequest,DeleteSpeaker)

export default router
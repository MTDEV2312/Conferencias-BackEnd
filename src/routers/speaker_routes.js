import {Router} from 'express'
import {RegisterSpeaker,GetSpeakers,GetSpeakerById,UpdateSpeaker,DeleteSpeaker} from '../controllers/speakers_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/speakers/register',verifyJwt,RegisterSpeaker)
router.get('/speakers/',verifyJwt,GetSpeakers)
router.get('/speakers/:cedula',verifyJwt,GetSpeakerById)
router.patch('/speakers/update/:id',verifyJwt,UpdateSpeaker)
router.delete('/speakers/delete/:id',verifyJwt,DeleteSpeaker)

export default router
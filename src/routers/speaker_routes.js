import {Router} from 'express'
import {RegisterSpeaker,GetSpeakers,GetSpeakerById,UpdateSpeaker,DeleteSpeaker} from '../controllers/speakers_controller.js'

const router = Router()

router.post('/speakers/register',RegisterSpeaker)
router.get('/speakers/',GetSpeakers)
router.get('/speakers/:cedula',GetSpeakerById)
router.patch('/speakers/update/:id',UpdateSpeaker)
router.delete('/speakers/delete/:id',DeleteSpeaker)

export default router
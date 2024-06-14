import express from 'express'
import authRoute from '../route/auth/authRoute.js'
import postRoute from '../route/postRoute.js'
import commentRoute from '../route/commentRoute.js'
const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute)
router.use('/comment', commentRoute)

export default router;
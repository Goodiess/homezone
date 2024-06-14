import express from "express";
import authRoute from '../route/auth/authRoute.js'
// import userRoute from '../routes/user/userRoute.js'
// import postRoute from '../routes/post/postRoute.js'
const router = express.Router()

router.use('/auth', authRoute)
// router.use('/user', houseRoute)
// router.use('/post', postRoute)

export default router; 
import { createPost } from "../controllers/postController.js";
import express from 'express'
import { deleteSingleHouse, getAllHouses, getSingleHouse } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectedRoute.js";

const router = express.Router()


router.post("/add", protectRoute ,createPost)
router.get("/", getAllHouses)
router.get("/:id", getSingleHouse)
router.delete("/:id",deleteSingleHouse)

export default router
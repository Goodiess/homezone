import { createPost, deletePost, getAllPosts, getSinglePost } from "../../controllers/houseController.js";
import protectRoute from "../../middlewares/protectRoute.js";
import { getAllHouses, getSingleHouse } from "../controllers/user.controller.js";
const router = express.Router()


router.post("/add", protectRoute ,createPost)
router.get("/", protectRoute, getAllHouses)
router.get("/:id", protectRoute, getSingleHouse)
router.delete("/:id", protectRoute, deleteHouse)

export default router
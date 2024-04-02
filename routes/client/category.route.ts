import { Router} from "express";
import  * as controller from "../../controllers/client/category.controller";
import Tour from "../../models/tour.model";

const router : Router = Router();

router.get("/", controller.index);

export const categoryRoutes : Router = router;
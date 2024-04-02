import { Router} from "express";
import  * as controller from "../../controllers/client/tour.controller";
import Tour from "../../models/tour.model";

const router : Router = Router();

router.get("/:slugCategory", controller.index);

export const tourRoutes : Router = router;
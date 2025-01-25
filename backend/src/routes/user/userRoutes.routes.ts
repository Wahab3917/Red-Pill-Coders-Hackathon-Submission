import { Router } from "express";
import {
  userLogin,
  userSignup,
} from "../../controllers/user/userController.controller";

const router: Router = Router();

router.post("/v1/user/signup", userSignup);
router.post("/v1/user/login", userLogin);

export default router;

import { Router } from "express";
import {
  adminLogin,
  adminSignup,
} from "../../controllers/admin/adminController.controller";

const router: Router = Router();

router.post("/v1/admin/signup", adminSignup);
router.post("/v1/admin/login", adminLogin);

export default router;

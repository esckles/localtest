import { Router } from "express";
import { signUp, VerifyUser } from "../controller/userController";

const router: any = Router();

//RegisterFLow
router.route("/signup-user").post(signUp);
router.route("/verify/:userID").post(VerifyUser);
//RegisterFLow

//ReadUserFlow

//ReadUserFlow

export default router;

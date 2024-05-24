import { Router } from "express";
import { createUser, getUsers, getUser, deleteUser, resetPassword, changeIfo } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
const router = Router();

// router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getUsers);
router.post("/", [checkExistingUser], createUser);
router.get("/", getUsers);
// router.get("/:userId", [verifyToken, isAdmin, checkExistingUser], getUser);
router.get("/:userId", getUser);
router.delete("/:userId", verifyToken, deleteUser);
router.post(":userId/reset-password", resetPassword )
router.put(":userId", changeIfo)
export default router;

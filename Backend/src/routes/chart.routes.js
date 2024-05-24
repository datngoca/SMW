import { Router } from "express";
import {
  getMonth,
  getYearlyRevenue,
  totalInfo
} from "../controllers/chart.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

const router = Router();
router.get("/totalinfo", totalInfo);
router.get("/", verifyToken, getMonth);
router.get("/:year", verifyToken, getYearlyRevenue);

export default router;

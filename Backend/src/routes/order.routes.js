import { Router } from "express";
import { createOrder, getOrderById, getAllOrders, updateOrderById, deleteOrderById } from "../controllers/order.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


  
router.get("/", getAllOrders);

router.post("/", createOrder);
router
  .route('/:OrderId')
  .get(getOrderById)
  .put(updateOrderById)
  .delete(deleteOrderById)

export default router;

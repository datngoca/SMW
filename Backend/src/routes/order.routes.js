import { Router } from "express";
import { 
  createOrder, 
  getOrderById, 
  getAllOrders, 
  updateOrderById, 
  deleteOrderById, 
  createCustomer, getCustomer, updateCustomer, deleteCustomer } from "../controllers/order.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();



router.get("/", getAllOrders);
router.post("/", createOrder);


router
  .route('/:orderId')
  .get(getOrderById)
  .put(updateOrderById)
  .delete(deleteOrderById)

router.post("/:orderId/customer", createCustomer); // Tạo mới một sản phẩm trong order
router.get("/:orderId/customer", getCustomer);
router
  .route('/:orderId/customer/:CustomerId')
  .put(updateCustomer)
  .delete(deleteCustomer)

export default router;

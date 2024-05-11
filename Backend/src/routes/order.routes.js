import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createProduct,
  getAllProduct,
  getProductbyID,
  updateProductbyID,
  deleteProductbyID
} from "../controllers/order.controller.js";
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


 
router.get("/:orderId/customer", getCustomer);

router
  .route('/:orderId/customer/:CustomerId')
  .post(createCustomer)
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer)

// Tạo mới một sản phẩm trong order
router.get("/:orderId/products", getAllProduct);

router
  .route('/:orderId/products/:productId')
  .post(createProduct)
  .get(getProductbyID)
  .put(updateProductbyID)
  .delete(deleteProductbyID)

export default router;

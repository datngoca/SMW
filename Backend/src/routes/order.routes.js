import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
  searchOrdersByCustomerName,

} from "../controllers/order.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/search/:customerName", searchOrdersByCustomerName);
router
  .route('/:orderId')
  .get(getOrderById)
  .put(updateOrderById)
  .delete(deleteOrderById)


 
// router.get("/:orderId/customer", getCustomer);

// router
//   .route('/:orderId/customer/:CustomerId')
//   .post(verifyToken, createCustomer)
//   .get(verifyToken,getCustomerById)
//   .put(verifyToken,updateCustomer)
//   .delete(verifyToken,deleteCustomer)





// Tạo mới một sản phẩm trong order
// router.get("/:orderId/products", getAllProduct);

// router
//   .route('/:orderId/products/:productId')
//   .post(createProduct)
//   .get(getProductbyID)
//   .put(updateProductbyID)
//   .delete(deleteProductbyID)

export default router;

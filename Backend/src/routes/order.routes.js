import { Router } from "express";
import { 
  createOrder, 
  getOrderById, 
  getAllOrders, 
  updateOrderById, 
  deleteOrderById, 
  createProduct, 
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct } from "../controllers/order.controller.js";
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

router.post("/:orderId/products", createProduct); // Tạo mới một sản phẩm trong order
router.get("/:orderId/products", getProduct);
router
  .route('/:orderId/products/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct)

export default router;

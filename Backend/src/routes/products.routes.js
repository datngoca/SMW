import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  searchProduct
} from "../controllers/products.controller.js";
import { verifyToken, isUser, isAdmin } from "../middlewares/authJwt.js";

const router = Router();


  
router.get("/", getProducts);

// router.get("/:productId", getProductById);
// // router.post("/", [verifyToken, isModerator], createProduct);
// router.post("/", createProduct);
// router.put("/:productId", [verifyToken, isModerator], updateProductById);
// router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

router.post("/",verifyToken, createProduct);
router
  .route('/:productId')
  .get(getProductById)
  .put(verifyToken,updateProductById)
  .delete(verifyToken,deleteProductById)

router.get('/search/:productName', searchProduct);
export default router;

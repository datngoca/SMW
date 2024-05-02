import { Router } from "express";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


router.get("/", getCustomers);
// router.get("/:productId", getProductById);
// // router.post("/", [verifyToken, isModerator], createProduct);
// router.post("/", createProduct);
// router.put("/:productId", [verifyToken, isModerator], updateProductById);
// router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

router.post("/", createCustomer);
router
  .route('/:productId')
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer)

export default router;

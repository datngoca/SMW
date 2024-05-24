import { Router } from "express";
import { 
  createCustomer, 
  getCustomers, 
  getCustomerbyID,
  updateCustomer, 
  deleteCustomer,
  searchCustomer
} from "../controllers/customer.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


router.get("/", getCustomers);
router.post("/", createCustomer);
router
  .route('/:customerId')
  .get(getCustomerbyID)
  .put(updateCustomer)
  .delete(deleteCustomer)
router.get("/search/:name",searchCustomer);

export default router;




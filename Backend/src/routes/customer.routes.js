import { Router } from "express";
import { createCustomer, getCustomers, getCustomerbyID, updateCustomer, deleteCustomer, createOrderHistory, getOrderHistory, updateOrderHistory, deleteOrderHistory, getOrderHistoryID } from "../controllers/customer.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


router.get("/", getCustomers);
router.post("/", createCustomer);

router.post("/:customerId/orderhistory",  createOrderHistory);
router.get("/:customerId/orderhistory",  getOrderHistory);
router
  .route('/:customerId')
  .get(getCustomerbyID)
  .put(updateCustomer)
  .delete(deleteCustomer)
router
  .route('/:customerId/orderhistory/:orderHistoryId')
  .put( updateOrderHistory)
  .delete( deleteOrderHistory)
  .get( getOrderHistoryID)


export default router;




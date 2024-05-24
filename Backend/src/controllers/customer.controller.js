import Customer from "../models/Customer.js";
import mongoose from "mongoose";
// Tạo mới một khách hàng
export const createCustomer = async (req, res) => {
  const { name, email, phone_number, address } = req.body;
  try {
    const customer = new Customer({ name, email, phone_number, address});
    await customer.save();
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: "Error creating customer", message: error.message });
  }
};

// Lấy danh sách tất cả khách hàng
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ error: "Error fetching customers", message: error.message });
  }
};

// Lấy thông tin của một khách hàng dựa trên ID
export const getCustomerbyID = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: "Error fetching customer", message: error.message });
  }
};

// Cập nhật thông tin của một khách hàng
export const updateCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const newData = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(customerId, newData, { new: true });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ error: "Error updating customer", message: error.message });
  }
};

// Xóa một khách hàng dựa trên ID
export const deleteCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ error: "Error deleting customer", message: error.message });
  }
};
export const searchCustomer = async (req, res) => {
  try {
    let results;
    const name = req.params.name;
    if (name) {
      results = await Customer.aggregate([
        {
          $match: {
            name: {
              $regex: name,
              $options: "i" 
            }
          }
        },
        {
          $project: { 
            name: 1,
            email: 1,
            no_of_Products: 1,
            phone_number: 1,
            address: 1,
          }
        },
        {
          $limit: 10
        }
      ]);
      return res.send(results);
    }
    res.send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}


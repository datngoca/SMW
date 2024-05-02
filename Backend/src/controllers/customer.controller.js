import Customer from "../models/Customer.js";

// Tạo mới một khách hàng
export async function createCustomer(req, res) {
  const { name, email, phone_number, address, order_history } = req.body;
  try {
    const customer = new Customer({ name, email, phone_number, address, order_history });
    await customer.save();
    res.status(201).json({ message: "Customer created", customer });
  } catch (error) {
    res.status(500).json({ error: "Error creating customer", message: error.message });
  }
}

// Lấy danh sách tất cả khách hàng
export async function getCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error: "Error fetching customers", message: error.message });
  }
}

// Lấy thông tin của một khách hàng dựa trên ID
export async function getCustomer(req, res) {
  const customerId = req.params.customerId;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error: "Error fetching customer", message: error.message });
  }
}

// Cập nhật thông tin của một khách hàng
export async function updateCustomer(req, res) {
  const customerId = req.params.customerId;
  const newData = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(customerId, newData, { new: true });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated", customer });
  } catch (error) {
    res.status(500).json({ error: "Error updating customer", message: error.message });
  }
}

// Xóa một khách hàng dựa trên ID
export async function deleteCustomer(req, res) {
  const customerId = req.params.customerId;
  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted", customer });
  } catch (error) {
    res.status(500).json({ error: "Error deleting customer", message: error.message });
  }
}

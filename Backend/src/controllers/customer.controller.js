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
export async function getCustomerbyID(req, res) {
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
//orderhistory
export const createOrderHistory = async (req, res) => {
  try {
      const { customerId } = req.params;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy khách hàng' });
      }
      customer.order_history.push(req.body);
      await customer.save();
      return res.status(201).json({ success: true, data: customer });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Lỗi khi tạo mới bản ghi trong order_history' });
  }
};

// Hàm đọc tất cả các bản ghi trong order_history của một khách hàng
export const getOrderHistory = async (req, res) => {
  try {
      const { customerId } = req.params;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy khách hàng' });
      }
      return res.status(200).json({ success: true, data: customer.order_history });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Lỗi khi đọc order_history của khách hàng' });
  }
};

// Hàm cập nhật một bản ghi trong order_history của một khách hàng
export const updateOrderHistory = async (req, res) => {
  try {
      const { customerId, orderHistoryId } = req.params;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy khách hàng' });
      }
      const orderHistoryIndex = customer.order_history.findIndex(history => history._id === orderHistoryId);
      if (orderHistoryIndex === -1) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy bản ghi trong order_history' });
      }
      customer.order_history[orderHistoryIndex] = { ...req.body, _id: orderHistoryId };
      await customer.save();
      return res.status(200).json({ success: true, data: customer });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Lỗi khi cập nhật bản ghi trong order_history' });
  }
};

// Hàm xóa một bản ghi trong order_history của một khách hàng
export const deleteOrderHistory = async (req, res) => {
  try {
      const { customerId, orderHistoryId } = req.params;
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy khách hàng' });
      }
      const orderHistoryIndex = customer.order_history.findIndex(history => history._id === orderHistoryId);
      if (orderHistoryIndex === -1) {
          return res.status(404).json({ success: false, error: 'Không tìm thấy bản ghi trong order_history' });
      }
      customer.order_history.splice(orderHistoryIndex, 1);
      await customer.save();
      return res.status(200).json({ success: true, data: customer });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Lỗi khi xóa bản ghi trong order_history' });
  }
};
export const getOrderHistoryID = async (req, res) => {
  try {
    // Extract customerId and orderHistoryId from request parameters
    const { customerId, orderHistoryId } = req.params;

    // Logic to fetch order history by ID
    const orderHistory = await OrderHistory.findById(orderHistoryId);

    // Check if order history exists
    if (!orderHistory) {
      return res.status(404).json({ message: "Order history not found" });
    }

    // Check if order history belongs to the specified customer
    if (orderHistory.customerId !== customerId) {
      return res.status(403).json({ message: "Order history does not belong to this customer" });
    }

    // Return the order history
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Error fetching order history by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

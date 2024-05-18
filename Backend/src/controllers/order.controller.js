import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import mongoose from 'mongoose';

// Tạo một đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const {
      customerPhoneNumber, // Lấy số điện thoại khách hàng từ yêu cầu
      productNames, // Mảng tên các sản phẩm được thêm vào đơn hàng
      order_date,
      shipping_address,
      payment_method,
      payment_status
    } = req.body;

    // Tìm kiếm khách hàng trong bảng Customer bằng số điện thoại
    const customer = await Customer.findOne({ phone_number: customerPhoneNumber });

    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    // Tìm kiếm các sản phẩm trong bảng Product bằng tên sản phẩm
    const products = await Product.find({ name: { $in: productNames } });

    if (!products) {
      return res.status(404).json({ success: false, error: 'Products not found' });
    }

    // Tạo một mảng các đối tượng sản phẩm từ các thông tin sản phẩm đã tìm thấy
    const productsToAdd = products.map(product => ({
      name: product.name,
      price: product.price
    }));

    // Tạo một đối tượng đơn hàng mới
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      customer: { name: customer.name, phone_number: customer.phone_number }, // Thêm thông tin của khách hàng vào đơn hàng
      product: productsToAdd, // Thêm sản phẩm vào đơn hàng
      order_date: order_date,
      shipping_address: shipping_address,
      payment_method: payment_method,
      payment_status: payment_status
    });

    // Lưu đơn hàng mới
    const savedOrder = await order.save();

    return res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Could not create order' });
  }
};
// Lấy thông tin một đơn hàng dựa trên ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy đơn hàng' });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Lỗi khi lấy thông tin đơn hàng' });
  }
};
// Lấy tất cả các đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch orders' });
  }
};
export const updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params; // Get the order ID from the request parameters
    const {
      customerPhoneNumber, // Customer phone number from request body
      productNames, // Array of product names to be added to the order
      order_date,
      shipping_address,
      payment_method,
      payment_status
    } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Find the customer by phone number
    const customer = await Customer.findOne({ phone_number: customerPhoneNumber });
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    // Find the products by their names
    const products = await Product.find({ name: { $in: productNames } });
    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, error: 'Products not found' });
    }

    // Create an array of product objects from the found product information
    const productsToAdd = products.map(product => ({
      name: product.name,
      price: product.price
    }));

    // Update the order fields
    order.customer = { name: customer.name, phone_number: customer.phone_number }; // Update customer information
    order.product = productsToAdd; // Update products in the order
    order.order_date = order_date;
    order.shipping_address = shipping_address;
    order.payment_method = payment_method;
    order.payment_status = payment_status;

    // Save the updated order
    const updatedOrder = await order.save();

    return res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(500).json({ success: false, error: 'Could not update order' });
  }
};
export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy đơn hàng' });
    }
    return res.status(200).json({ success: true, message: 'Đã xóa đơn hàng thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Không thể xóa đơn hàng' });
  }
};


// Function to create a Customer in an order
export const createCustomer = async (req, res) => {
  try {
    const { orderId, CustomerId } = req.params; // Get orderId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const customer = await Customer.findById(CustomerId);
    if(!customer){
      return res.status(404).json({ message: "Customer not found" });
    }
    // Create a new Customer and push it to the order's customer array
    order.customer.push({
      _id: customer._id,
      Name: customer.name,
      phonenumber:customer.phone_number

    }); // Assuming the request body contains Customer data
    await order.save(); // Save the updated order

    res.status(201).json(order.customer[order.customer.length - 1]); // Return the newly created Customer
  } catch (error) {
    console.error("Error creating Customer in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Function to get customer data from an order
export const getCustomer = async (req, res) => {
  try {
    const { orderId } = req.params; // Lấy orderId từ request params
    const order = await Order.findById(orderId); // Tìm đơn hàng bằng orderId

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    return res.status(200).json({ success: true, data: order.customer }); // Trả về thông tin của khách hàng
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng từ đơn hàng:", error);
    return res.status(500).json({ success: false, error: 'Lỗi khi đọc thông tin khách hàng từ đơn hàng' });
  }
};
// Function to update a Customer by CustomerId in an order
export const updateCustomer = async (req, res) => {
  try {
    const { orderId, CustomerId } = req.params; // Get orderId and CustomerId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const CustomerIndex = order.customer.findIndex(prod => prod._id == CustomerId); // Find the index of the Customer by CustomerId

    if (CustomerIndex === -1) {
      return res.status(404).json({ message: "Customer not found in order" });
    }

    // Update the Customer data
    order.customer[CustomerIndex] = { ...order.customer[CustomerIndex], ...req.body }; // Assuming the request body contains updated Customer data
    await order.save(); // Save the updated order

    res.status(200).json(order.customer[CustomerIndex]); // Return the updated Customer
  } catch (error) {
    console.error("Error updating Customer in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Function to delete a Customer by CustomerId in an order
export const deleteCustomer = async (req, res) => {
  try {
    const { orderId, CustomerId } = req.params; // Get orderId and CustomerId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const CustomerIndex = order.customer.findIndex(prod => prod._id.toString() == CustomerId); // Find the index of the Customer by CustomerId

    if (CustomerIndex === -1) {
      return res.status(404).json({ message: "Customer not found in order" });
    }

    // Remove the Customer from the customer array
    order.customer.splice(CustomerIndex, 1);
    await order.save(); // Save the updated order

    res.status(204).json(); // Return no content for successful deletion
  } catch (error) {
    console.error("Error deleting Customer in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCustomerById = async (req, res) => {
  try {
    const { orderId, CustomerId } = req.params; // Lấy orderId và customerId từ request params

    const order = await Order.findById(orderId); // Tìm đơn hàng bằng orderId

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Find the customer within the order by customerId
    const customer = order.customer.find(customer => customer._id.toString() === CustomerId);

    if (!customer) {
      return res.status(404).json({ message: "Khách hàng không tồn tại trong đơn hàng" });
    }

    res.status(200).json(customer); // Trả về khách hàng được tìm thấy
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng trong đơn hàng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    // Thêm sản phẩm vào đơn hàng
    order.product.push({
      _id: product._id,
      name: product.name,
      price: product.price
    });
    await order.save();
    res.status(201).json(order.product[order.product.length - 1]); // Return the newly created Customer
  } catch (error) {
    console.error("Error creating Products in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order.product }); // Return all customer in the order
  } catch (error) {
    console.error("Error getting product in order:", error);
    return res.status(500).json({ success: false, error: 'Lỗi khi đọc customer của khách hàng' });
  }
};
export const updateProductbyID = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and CustomerId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const ProductIndex = order.product.findIndex(prod => prod._id.toString() == productId); // Find the index of the Customer by CustomerId

    if (CustomerIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Update the Customer data
    order.product[ProductIndex] = { ...order.product[ProductIndex], ...req.body }; // Assuming the request body contains updated Customer data
    await order.save(); // Save the updated order

    res.status(200).json(order.product[ProductIndex]); // Return the updated Customer
  } catch (error) {
    console.error("Error updating Product in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteProductbyID = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and CustomerId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const ProductIndex = order.product.findIndex(prod => prod._id.toString() == productId); // Find the index of the Customer by CustomerId

    if (ProductIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Remove the Customer from the customer array
    order.product.splice(ProductIndex, 1);
    await order.save(); // Save the updated order

    res.status(204).json({message: "delete successfully"}); // Return no content for successful deletion
  } catch (error) {
    console.error("Error deleting Customer in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProductbyID = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and productId from request params

    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the product within the order by productId
    const product = order.product.find(product => product._id.toString() === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found in the order" });
    }

    res.status(200).json(product); // Return the product found
  } catch (error) {
    console.error("Error fetching product in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


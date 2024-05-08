import Order from "../models/Order.js";

// Tạo một đơn hàng mới
export const createOrder = async (req, res) => {
    try {
        const { products, order_date, shipping_address, payment_method, payment_status } = req.body;

        // Tạo một đối tượng đơn hàng mới
        const order = new Order({
            products,
            order_date,
            shipping_address,
            payment_method,
            payment_status
        });

        // Lưu đơn hàng mới
        const savedOrder = await order.save();

        return res.status(200).json({
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
    const { orderId } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error(error);
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
// Function to create a product in an order
const createProduct = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create a new product and push it to the order's products array
    order.products.push(req.body); // Assuming the request body contains product data
    await order.save(); // Save the updated order

    res.status(201).json(order.products[order.products.length - 1]); // Return the newly created product
  } catch (error) {
    console.error("Error creating product in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all products in an order
const getProduct = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order.products); // Return all products in the order
  } catch (error) {
    console.error("Error getting products in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get a product by productId in an order
const getProductById = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and productId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const product = order.products.find(prod => prod._id == productId); // Find the product by productId

    if (!product) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    res.status(200).json(product); // Return the product
  } catch (error) {
    console.error("Error getting product by ID in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update a product by productId in an order
const updateProduct = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and productId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const productIndex = order.products.findIndex(prod => prod._id == productId); // Find the index of the product by productId

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Update the product data
    order.products[productIndex] = { ...order.products[productIndex], ...req.body }; // Assuming the request body contains updated product data
    await order.save(); // Save the updated order

    res.status(200).json(order.products[productIndex]); // Return the updated product
  } catch (error) {
    console.error("Error updating product in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a product by productId in an order
const deleteProduct = async (req, res) => {
  try {
    const { orderId, productId } = req.params; // Get orderId and productId from request params
    const order = await Order.findById(orderId); // Find the order by orderId

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const productIndex = order.products.findIndex(prod => prod._id == productId); // Find the index of the product by productId

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Remove the product from the products array
    order.products.splice(productIndex, 1);
    await order.save(); // Save the updated order

    res.status(204).json(); // Return no content for successful deletion
  } catch (error) {
    console.error("Error deleting product in order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createProduct, getProduct, getProductById, updateProduct, deleteProduct };



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
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Could not fetch order' });
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
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Could not update order' });
    }
};

// Xóa đơn hàng dựa trên ID
export const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Could not delete order' });
    }
};

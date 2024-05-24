import mongoose from "mongoose";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js"
import Product from "../models/Product.js";


export const getMonth = async (req, res) => {
    try {
        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$order_date" },
                        month: { $month: "$order_date" }
                    },
                    totalRevenue: { $sum: { $sum: "$product.price" } }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalRevenue: 1
                }
            },
            { $sort: { year: 1, month: 1 } }
        ]);

        res.json(revenueData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue data', error });
    }
};
export const getYearlyRevenue = async (req, res) => {
    try {
        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: { $year: "$order_date" },
                    totalRevenue: { $sum: { $sum: "$product.price" } }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    totalRevenue: 1
                }
            },
            { $sort: { year: 1 } }
        ]);

        res.json(revenueData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yearly revenue data', error });
    }
};
export const totalInfo = async (req, res) => {
    try {
        const countCustomer = await Customer.countDocuments();
        const countProduct = await Product.countDocuments();
        const countOrder = await Order.countDocuments();
        res.json({ countCustomer, countProduct, countOrder });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

import mongoose from "mongoose";

const { Schema } = mongoose;

const chartSchema = new Schema({
    month: { type: String, required: true },
    totalRevenue: { type: Number, required: true },
    totalCustomer: { type: Number, required: true },
    totalProduct: { type: Number, required: true }
});

export default mongoose.model("Chart", chartSchema);
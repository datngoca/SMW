// createFakeData.js
const mongoose = require("mongoose");
const faker = require("faker");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: String,
    no_of_Products:{
      type: Number,
      default :0,
    },
    price: {
      type: Number,
      default: 0,
    },
    serviceProvider: String,
    status: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

const generateRandomProducts = async (numProducts) => {
  try {
    for (let i = 0; i < numProducts; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        no_of_Products: faker.datatype.number(),
        price: faker.commerce.price(),
        serviceProvider: faker.company.companyName(),
        status: faker.random.arrayElement(['available', 'out of stock', 'coming soon'])
      });
      await product.save();
    }
    console.log(`${numProducts} random products created successfully.`);
  } catch (error) {
    console.error("Error creating products:", error);
  }
};

// Connect to MongoDB and generate random products
const createFakeData = async () => {
  await connectDB();
  await generateRandomProducts(10); // Change the number of products as needed
};

createFakeData().catch((error) => console.error("Error:", error));

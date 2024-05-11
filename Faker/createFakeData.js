const mongoose = require("mongoose");
const faker = require("faker");
const OrderModel = require("./Order"); // Import OrderModel using require
const CustomerModel = require("./Customer"); // Import CustomerModel using require
const ProductModel = require("./Product"); 
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const generateFakeOrder = async () => {
  try {
    // Get data from the "customers" collection in MongoDB
    const customers = await CustomerModel.find();
    // Randomly select one customer
    const randomIndex = Math.floor(Math.random() * customers.length);
    const randomCustomer = customers[randomIndex];

    const products = await ProductModel.find();
    const randomIndex2 = Math.floor(Math.random() * products.length);
    const randomProducts = products[randomIndex2];

    // Create fake order data based on the randomly selected customer
    const order = {
      _id: new mongoose.Types.ObjectId(),
      customer: {
        _id: randomCustomer._id, // Assign the _id of the customer to CustomerID in the order
        Name: randomCustomer.name,
        phonenumber: randomCustomer.phone_number
      },
      product:{
        _id: randomProducts._id,
        name: randomProducts.name,
        price: randomProducts.price
      },
      order_date: faker.date.past(),
      shipping_address: faker.address.streetAddress(),
      payment_method: faker.finance.transactionType(),
      payment_status: faker.random.arrayElement(["paid", "pending", "failed"])
    };
    return order;
  } catch (error) {
    throw new Error(`Error generating fake order: ${error}`);
  }
};

// Function to seed fake orders into the database
const seedOrders = async (numOrders) => {
  try {

    // Generate and save fake order data
    const orders = await Promise.all(Array.from({ length: numOrders }, generateFakeOrder));
    await OrderModel.create(orders);

    console.log(`${numOrders} orders seeded successfully.`);
  } catch (error) {
    console.error("Error seeding orders:", error);
  }
};

// Call the function to connect to the database
connectDB()
  .then(() => {
    // Call the function to seed fake orders after successfully connecting to the database
    seedOrders(10); // Seed 10 fake orders
  })
  .catch(error => {
    console.error("Error connecting to database:", error);
  });










// const mongoose = require("mongoose");
// const faker = require("faker");
// const Customer = require("./Customer");

// // Kết nối tới cơ sở dữ liệu MongoDB
// mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("Connected to database");

//   // Tạo dữ liệu ảo cho bảng Customer
//   for (let i = 0; i < 10; i++) { // Tạo 10 bản ghi ảo
//     const customer = new Customer({
//       _id: new mongoose.Types.ObjectId(),
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       phone_number: faker.phone.phoneNumber(),
//       address: faker.address.streetAddress()
//     });

//     // Lưu bản ghi vào cơ sở dữ liệu
//     customer.save()
//       .then(() => console.log("Customer created"))
//       .catch(err => console.error(err));
//   }
// })
// .catch(err => console.error("Database connection error:", err));




// const mongoose = require("mongoose");
// const faker = require("faker");
// const Product = require("./Product");

// // Kết nối MongoDB
// mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Hàm tạo dữ liệu giả cho Product
// async function seedProducts() {
//   try {
//     // Xóa tất cả dữ liệu cũ trong collection Product
//     await Product.deleteMany({});

//     // Tạo 100 bản ghi giả cho Product
//     const products = [];
//     for (let i = 0; i < 100; i++) {
//       const product = new Product({
//         name: faker.commerce.productName(),
//         category: faker.commerce.department(),
//         no_of_Products: faker.random.number(),
//         price: faker.random.number({ min: 10, max: 1000 }),
//         serviceProvider: faker.company.companyName(),
//       });
//       products.push(product);
//     }

//     // Lưu tất cả sản phẩm vào cơ sở dữ liệu
//     await Product.insertMany(products);

//     console.log("Dữ liệu đã được tạo thành công!");
//   } catch (error) {
//     console.error("Lỗi khi tạo dữ liệu:", error);
//   } finally {
//     // Ngắt kết nối MongoDB
//     mongoose.disconnect();
//   }
// }

// // Gọi hàm tạo dữ liệu giả
// seedProducts();

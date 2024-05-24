import Product from "../models/Product.js";

const USER_SEARCH_INDEX_NAME = 'user_search'
const USER_AUTOCOMPLETE_INDEX_NAME = 'user_autocomplete'


export const createProduct = async (req, res) => {
  const { name, category, no_of_Products, price, serviceProvider } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      no_of_Products,
      price,
      serviceProvider,
    });

    const productSaved = await newProduct.save();

    res.status(201).json({success: true, data: productSaved});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, data: error});
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json({success: true, data: product});
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json({success: true, data: products});
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json({success: true, data: updatedProduct});
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  // code 200 is ok too
  res.status(204).json({success: true, data: []});
};


export const searchProduct = async (req, res) => {
  try {
    let results;
    const productName = req.params.productName;
    if (productName) {
      results = await Product.aggregate([
        {
          $match: {
            name: {
              $regex: productName,
              $options: "i" 
            }
          }
        },
        {
          $project: { 
            name: 1,
            category: 1,
            no_of_Products: 1,
            price: 1,
            serviceProvider: 1,
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

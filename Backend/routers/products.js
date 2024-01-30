





//working

const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const api = process.env.API_URL;
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const multer = require('multer');
const axios = require('axios')

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('File type Invalid');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

const uploadOptions = multer({ storage: storage });


const findCategoryNameById =  async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (category) {
      return category.name; // Assuming the category name is stored in the 'name' field
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error('Failed to find category:', error);
    throw error;
  }
};





router.post(`/newone/`, uploadOptions.single("image"), async (request,response) => {
 // const category = await Category.findById(request.body.category);
 // if (!category) return response.status(400).send("Invalid Category");

 const file = request.file;
 if (!file) return response.status(400).send("No Image in the request");

 const fileName = request.file.filename;
 const basePath = `${request.protocol}://${request.get(
   "host"
 )}/public/uploads/`;
 //const basePath = `public/uploads/`;

  //const basePath = `public/uploads/`;
  let data = new Product({
    book_Title: request.body.book_Title,
    description: request.body.description,
    //richDescription: request.body.richDescription,
    image: `${basePath}${fileName}`,
    Book_Author: request.body.Book_Author,
    price: request.body.price,
    category: request.body.category,
    inStock: request.body.countInStock,
   // rating: request.body.rating,
   // numReviews: request.body.numReviews,
   // isFeatured: request.body.isFeatured,
  });
  data =await   data.save().then((result)=>{
    console.log(data)
    
   /* res.send(result)
  }).catch((err)=>{
    res.send(err)
  });*/
const categoryId = request.body.category;
console.log(categoryId);
// const categoryName = await  findCategoryNameById(categoryId); 
// console.log(categoryName);
// const updatedData = {
//     ...req.body,
//     category: categoryName  // Use the category name instead of the category ID
//   };
findCategoryNameById(categoryId)
.then((categoryName) => {
  console.log(categoryName);


  const updatedData = {
    ...request.body,
   
    
    category: categoryName, // Use the category name instead of the category ID
  };
  console.log(updatedData);

  //change here also
  axios.post('https://30a5-182-191-144-187.ngrok-free.app/update_dataset', updatedData)
  .then(() => {
    console.log('Recommendation dataset updated successfully');
    // Handle any additional logic or response
    response.sendStatus(200);
  })
  .catch((error) => {
    console.error('Failed to update recommendation dataset:', error);
   
    response.sendStatus(500);
  });

    

})
  
.catch((err) => {
    response.send(err);
  });
});;
})
     




























router.get('/:id', async (req, res) => {
  /*const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });*/
  try {
    
    const product = await Product.findById(req.params.id).populate('category');
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// router.get('/get/count', async (req, res) => {
//   try {
//     const productCount = await Product.countDocuments();
//     res.send({ count: productCount });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.estimatedDocumentCount();
    res.send({ count: productCount });
    console.log("SuCCCESSS")
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});










router.get('/get/admin/', async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(',') };
    }
    const productList = await Product.find(filter).populate('category', 'name');
    res.send(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
//add new function





router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; // Number of products per page

    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(',') };
    }

    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / pageSize);

    const productList = await Product.find(filter)
      .populate('category', 'name')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.send({ productList, totalPages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



// router.get('/get/admin', async (req, res) => {
//   try {
   

//     // let filter = {};
//     // if (req.query.categories) {
//     //   filter = { category: req.query.categories.split(',') };
//     // }

//     // const totalCount = await Product.countDocuments(filter);
//     // const totalPages = Math.ceil(totalCount / pageSize);

//     const productList = await Product.find()
//       .populate('category', 'name');
//       console.log(productList);

//     res.send({ productList });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });











router.post('/',uploadOptions.single('image') ,async(req,res)=>{
 // router.post('/', async(req,res)=>{
    console.log('me')
    //let check = await Category.findById(req.body.category);
    //if(!check) {return res.send("Incorrect id of category");}
    const file = req.file
    if(!file)
    {
        res.status(400).send("File not found")
    }
    const fileName = req.file.filename
    const basePath= `${req.protocol}://${req.get('host')}/public/uploads`
    // let category = await Category.findById(req.body.category)
    // if(!category){ res.status.send("Category not mached")}

    //new function 
   
      
    let data = new Product(

       
         {
             //change
            //isbn:req.body.isbn,
            book_Title:req.body.book_Title,
            Book_Author:req.body.Book_Author,
            year_of_Publication:req.body.year_of_Publication,
            //publisher:req.body.publisher,
            image:`${basePath}${fileName}`,
            image:req.body.image,
            inStock:req.body.countInStock,
            //rating:req.body.rating,
            category:req.body.category,
            price:req.body.price,
            //isFeatured:req.body.isFeatured
            num_pages: req.body.num_pages,
            description:req.body.description
        }
    );

  data =await   data.save().then((result)=>{
    console.log(data)
    
   /* res.send(result)
  }).catch((err)=>{
    res.send(err)
  });*/
const categoryId = req.body.category;
console.log(categoryId);
// const categoryName = await  findCategoryNameById(categoryId); 
// console.log(categoryName);
// const updatedData = {
//     ...req.body,
//     category: categoryName  // Use the category name instead of the category ID
//   };
findCategoryNameById(categoryId)
.then((categoryName) => {
  console.log(categoryName);


  const updatedData = {
    ...req.body,
    category: categoryName, // Use the category name instead of the category ID
  };
  console.log(updatedData);

  //change here also
  axios.post('https://30a5-182-191-144-187.ngrok-free.app/update_dataset', updatedData)
  .then((response) => {
    console.log('Recommendation dataset updated successfully');
    // Handle any additional logic or response
    res.sendStatus(200);
  })
  .catch((error) => {
    console.error('Failed to update recommendation dataset:', error);
   
    res.sendStatus(500);
  });

    

})
  
.catch((err) => {
    res.send(err);
  });
});;
})
// router.post('/',uploadOptions.single('image') ,async(req,res)=>{
//     let check = await Category.findById(req.body.category);
//     if(!check) {return res.send("Incorrect id of category");}
//     const file = req.file
//     if(!file)
//     {
//         res.status(400).send("File not found")
//     }
//     const fileName = req.file.filename
//     const basePath= `${req.protocol}://${req.get('host')}/public/uploads`
//     // let category = await Category.findById(req.body.category)
//     // if(!category){ res.status.send("Category not mached")}
//     let data = new Product(
       
//          {
    
//             isbn:req.body.isbn,
//             book_Title:req.body.book_Title,
//             Book_Author:req.body.Book_Author,
//             year_of_Publication:req.body.year_of_Publication,
//             publisher:req.body.publisher,
//             image:`${basePath}${fileName}`,
//             inStock:req.body.inStock,
//             rating:req.body.rating,
//             category:req.body.category,
//             price:req.body.price,
//             isFeatured:req.body.isFeatured
//         }
//     );
//   data =  data.save().then((result)=>{
//     res.send(result)
//   }).catch((err)=>{
//     res.send(err)
//   });
//  //if the function is not async
// //  data.save().then((createdProduct=>{
// //     res.status(201).json(createdProduct)
// //  })).catch((err)=>{
// //     res.status(500).json({
// //         error:err,
// //         success:false
// //     })
// //  })
    

// });

router.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    console.log('I am searching for', title); 
    const product = await Product.findOne({ book_Title: { $regex: new RegExp('^' + title + '$', 'i') } });
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.get('/api/products/price', async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    });
    console.log("Price range products are :", products);

    if (products.length > 0) {
      res.json({ success: true, products });
    } else {
      res.status(404).json({ success: false, message: 'No products found within the specified price range' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

/*router.delete('/:id', (req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(product=>{
       // console.log(product);
        
        if (product) {
            // Call Flask API to delete product from dataset
            axios.delete('https://f097-111-68-96-41.ngrok-free.app/delete_product', {
                data: {
                    book_Title: product.book_Title,
                    category: product.category
                }
            })
                .then(response => {
                    // Handle Flask API response if needed
                    return res.status(300).json({ success: true, message: "Product deleted" });
                })
                .catch(error => {
                    // Handle error if the Flask API call fails
                    return res.status(500).json({ success: false, message: "Failed to delete product from dataset" });
                });
        } else {
      
        
            return res.status(101).send("Not deleted");
        }
    })
    .catch(err => {
        return res.status(400).json({ success: false, message: "Not connected" });
    });
});*/


router.put('/updateStock/:id', async (req, res) => {
  console.log("ssnsns",req.params.id)
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid product ID');
    }

    const productId = req.params.id;
    console.log("product",productId)
    const quantity = req.body.quantity; // Assuming you send the quantity in the request body

    // Fetch the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Calculate the new countInStock value
    const newCountInStock = product.inStock - quantity;

    // Update the product's countInStock
    product.inStock = newCountInStock;

    // Save the updated product
    const updatedProduct = await product.save();

    res.send(updatedProduct);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid product ID');
    }
     console.log('DATA BEING GET BY FRONT', req.body);
     console.log("SPace");
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        //isbn: req.body.isbn,
        book_Title: req.body.book_Title,
        Book_Author: req.body.Book_Author,
       // year_of_Publication: req.body.year_of_Publication,
        publisher: req.body.publisher,
        image: req.body.image,
       price: req.body.price,
      },
      { new: true }
    );

    if (updatedProduct) {
      console.log(updatedProduct);
      res.send(updatedProduct);
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send('Invalid product ID');
//     }

//     const deletedProduct = await Product.findByIdAndRemove(req.params.id);
//     if (deletedProduct) {
//       return res.status(200).json({ success: true, message: 'Product deleted' });
//     } else {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
router.delete('/:id', async (req, res) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (product) {
          const categoryId = product.category;

          try {
              const categoryName = await findCategoryNameById(categoryId);
              console.log(categoryName)
              
              try {
                  console.log("i am here")
                  console.log("Ther",product.book_Title)
                  const response = await axios.delete('https://30a5-182-191-144-187.ngrok-free.app/delete_product', {
                      data: {
                          book_Title: product.book_Title,
                          category: categoryName
                      }
                      
                      
                  });
                  
                  return res.status(200).json({ success: true, message: "Product deleted" });
              } catch (apiError) {
                  return res.status(500).json({ success: false, message: "Failed to delete product from dataset" });
              }
          } catch (categoryError) {
              return res.status(500).json({ success: false, message: "Failed to fetch category name" });
          }
      } else {
          return res.status(404).json({ success: false, message: "Product not found" });
      }
  } catch (err) {
      return res.status(400).json({ success: false, message: "Bad request" });
  }
});


router.put(
  '/image-gallery/:id',
  uploadOptions.array('images', 5),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid product ID');
      }

      const files = req.files;
      let imagePaths = [];
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

      if (files) {
        files.map((file) => {
          imagePaths.push(`${basePath}${file.filename}`);
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagePaths,
        },
        { new: true }
      );

      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  

  }
);







module.exports = router;




// //mine
// const express = require('express');
// const router = express.Router();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const api = process.env.API_URL;
// const { Product } = require('../models/product');
// const { Category } = require('../models/category');
// const multer = require('multer');

// const FILE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpeg',
//   'image/jpg': 'jpg',
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error('File type Invalid');
//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(' ').join('-');
//     const extention = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extention}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

// router.get('/:id', async (req, res) => {
//   /*const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid product ID',
//       });*/
//   try {
    
//     const product = await Product.findById(req.params.id).populate('category');
//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).json({ success: false, message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // router.get('/get/count', async (req, res) => {
// //   try {
// //     const productCount = await Product.countDocuments();
// //     res.send({ count: productCount });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // });

// router.get('/get/count', async (req, res) => {
//   try {
//     const productCount = await Product.estimatedDocumentCount();
//     res.send({ count: productCount });
//     console.log("SuCCCESSS")
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });



// router.get('/', async (req, res) => {
//   try {
//     let filter = {};
//     if (req.query.categories) {
//       filter = { category: req.query.categories.split(',') };
//     }
//     const productList = await Product.find(filter).populate('category', 'name');
//     res.send(productList);
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// router.post('/', 
// uploadOptions.single('image'), 
// async (req, res) => {

//   //add new function
// const findCategoryNameById = async (categoryId) => {
//   try {
//     const category = await Category.findById(categoryId);
//     if (category) {
//       return category.name; // Assuming the category name is stored in the 'name' field
//     } else {
//       throw new Error('Category not found');
//     }
//   } catch (error) {
//     console.error('Failed to find category:', error);
//     throw error;
//   }
// };

//   try {
//     console.log("This is  in frontend : ", req.body);
//     const checkCategory = await Category.findById(req.body.category);
//     if (!checkCategory) {
//       return res.status(400).send('Incorrect category ID');
//     }
//     // const file = req.file;
//     // if (!file) {
//     //   return res.status(400).send('File not found');
//     // }
//     // const fileName = req.file.filename;
//    // const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;

//     const product = new Product({
//       //isbn: req.body.isbn,
//       book_Title: req.body.book_Title,
//       Book_Author: req.body.Book_Author,
//       year_of_Publication: req.body.year_of_Publication,
//       publisher: req.body.publisher,
//       //image: `${basePath}/${fileName}`,
//       inStock: req.body.inStock,
//       //rating: req.body.rating,
//       category: req.body.category,
//       price: req.body.price,
//       description:req.body.description,
//       num_pages:req.body.num_pages
//       //isFeatured: req.body.isFeatured,
//       //countInStock:req.body.countInStock
//     });
//     product.save()
//     .then((result) => {
//       const categoryId = req.body.category;
//       const categoryName = findCategoryNameById(categoryId);
//       const updatedData = {
//         ...req.body,
//         category: categoryName // Use the category name instead of the category ID
//       };

//       axios.post('https://1ab1-111-68-96-41.ngrok-free.app/update_dataset', updatedData)
//         .then((response) => {
//           console.log('Recommendation dataset updated successfully');
//           // Handle any additional logic or response
//           res.sendStatus(200);
//         })
//         .catch((error) => {
//           console.error('Failed to update recommendation dataset:', error);
//           res.sendStatus(500);
//         });
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// } catch (error) {
//   console.error('Error while saving the product:', error);
//   res.sendStatus(500);
// }
// });*/


// router.get('/title/:title', async (req, res) => {
//   const title = req.params.title;
//   try {
//     console.log('I am searching for', title); 
//     const product = await Product.findOne({ book_Title: { $regex: new RegExp('^' + title + '$', 'i') } });
//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).json({ success: false, message: 'Book not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });



// router.put('/:id', async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send('Invalid product ID');
//     }
//      console.log('DATA BEING GET BY FRONT', req.body);
//      console.log("SPace");
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         //isbn: req.body.isbn,
//         book_Title: req.body.book_Title,
//         Book_Author: req.body.Book_Author,
//        // year_of_Publication: req.body.year_of_Publication,
//         publisher: req.body.publisher,
//         image: req.body.image,
//        price: req.body.price,
//       },
//       { new: true }
//     );

//     if (updatedProduct) {
//       console.log(updatedProduct);
//       res.send(updatedProduct);
//     } else {
//       res.status(404).json({ success: false, message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send('Invalid product ID');
//     }

//     const deletedProduct = await Product.findByIdAndRemove(req.params.id);
//     if (deletedProduct) {
//       return res.status(200).json({ success: true, message: 'Product deleted' });
//     } else {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// router.put(
//   '/image-gallery/:id',
//   uploadOptions.array('images', 5),
//   async (req, res) => {
//     try {
//       if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid product ID');
//       }

//       const files = req.files;
//       let imagePaths = [];
//       const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

//       if (files) {
//         files.map((file) => {
//           imagePaths.push(`${basePath}${file.filename}`);
//         });
//       }

//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           images: imagePaths,
//         },
//         { new: true }
//       );

//       if (updatedProduct) {
//         res.send(updatedProduct);
//       } else {
//         res.status(404).json({ success: false, message: 'Product not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
  

//   }
// );


// module.exports = router;


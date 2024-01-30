const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');

//const app = express();


const {Product,productSchema } = require('../models/product'); // Updated import statement
const {Category} = require('../models/category');
let dataImported = false; // Flag to track if data has been imported

//mongoose.connect('mongodb://127.0.0.1:27017/Check')
mongoose.connect('mongodb+srv://esha-13:esha3456@cluster0.xdbf0tf.mongodb.net/Storeroom')
  .then(() => {
    console.log('Connected to the database');
    importBooks()
    /*if (!dataImported) {
      checkIfBooksExist().then((booksExist) => {
        if (!booksExist) {
          importBooks().then(() => {
            
            dataImported = true;
          }).catch((error) => {
            console.error('Error importing books:', error);
          });
        } else {
          console.log('Books already exist in the database. Skipping import.');
          //importCategories();
        }
      }).catch((error) => {
        console.error('Error checking if books exist:', error);
      });
    }
  })*/
})
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });
  

   /* app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });*/

    //importBooks(); // Call the function to import the books
  //})
  //.catch((err) => {
    //console.log('Error connecting to the database:', err);
  //});

  async function checkIfBooksExist() {
    try {
      const bookCount = await Product.countDocuments();
      return bookCount > 0;
    } catch (error) {
      throw error;
    }
  }
  async function importBooks() {
    try {
     
      // Step 1: Import the data from files and save it in the database
      const bookData = fs.createReadStream('Demo.csv').pipe(csv());
  
      for await (const row of bookData) {
       // const { book_Title, Book_Author, image, year_of_Publication, num_Pages, categoryname,category, price, inStock, description } = row;
    
        const { book_Title, Book_Author, image, year_of_Publication, num_pages, categoryname, category, price, inStock, description } = row;

        const book = new Product({
          book_Title,
          Book_Author,
          image,
          year_of_Publication,
          num_pages,
          price,
          inStock,
          description,
          categoryname,
          category: null // Set category name directly
        });
  
        await book.save();
      }
  
      console.log('Book import completed.');
  
      // Step 2: Create the Category collection
      const categorie = Array.from(new Set((await Product.find()).map((product) => product.categoryname)));
  
      for (const categoryname of categorie) {
        const newCategory = new Category({ name: categoryname });
        await newCategory.save();
      }
      console.log('Category import completed.');

    // Step 3: Get the Category IDs

    const categories = await Category.find();
const categoryMap = {};

for (const category of categories) {
  categoryMap[category.name] = category._id.toString();
}

const products = await Product.find();

for (const product of products) {
  const categoryName = product.categoryname;
  const categoryId = categoryMap[categoryName];
  console.log('Product:', product);
  console.log('Category Name:', categoryName);
  console.log('Category ID:', categoryId);

  if (categoryId) {
    product.category = categoryId;
    delete product.categoryname;
    //console.log('Updated Product:', product);
    await product.save();
    //console.log('Product saved.');
  }
  console.log('Product category update completed');

}
await Product.updateMany({}, { $unset: { categoryname: 1 } });
console.log('Deleted')

     //console.log('Product category update completed.');
    


   /* const categoryMap = {};
    const allCategories = await Category.find();

    for (const category of allCategories) {
      categoryMap[category.name] = category._id;
    }*/

    // Step 4: Update the Product model and change the category field type to `mongoose.Schema.Types.ObjectId`
    //productSchema.path('category', mongoose.Schema.Types.ObjectId);

    // Step 5: Update existing product documents with category IDs
    /*const products = await Product.find();
    for (const product of products) {
      const categoryId = categoryMap[product.category];
      await Product.updateOne({ _id: product._id }, { $set: { category: categoryId } });
    }

    console.log('Product category update completed.');*/
  } catch (error) {
    console.error('Error importing data:', error);
  }
}
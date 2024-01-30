const bodyParser = require('body-parser');
const express=require('express');
const nodemon = require('nodemon');
const app = express();
require('dotenv/config')
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt')
const errorHandler=require('./helpers/error-handler')
const multer = require("multer");

app.use(cors());
//app.use(cors({origin: true, credentials: true}));
app.options('*', cors());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // The directory where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // The filename used for the uploaded file
    }
  });
  
  // Multer instance as middleware
  const upload = multer({ storage: storage });

const api = process.env.API_URL;

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
// mongoose.connect('mongodb://127.0.0.1:27017/e-comm')
mongoose.connect('mongodb+srv://esha-13:esha3456@cluster0.xdbf0tf.mongodb.net/Storeroom')
.then((res)=>{
    console.log("DB Connected")
}).catch((err)=>{
  console.log(err)
    console.log("Not DB Connected")
})
//app.use(authJwt());
app.use(errorHandler)
app.use('/public/uploads', express.static(__dirname + '/public/uploads' ));

//Routes
const categoriesRoutes=require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');
//new line
const cartItemRoutes = require('./routers/cartRoutes')
//new line
const paymentRoutes= require('./routers/paymentRoutes')
//new line
const reviewroute= require('./routers/reviewroute')


//Models
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
//new line 
app.use(`${api}/cartItems`, cartItemRoutes);
//new line
app.use(`${api}/payments`, paymentRoutes);

//new line
app.use(`${api}/Rate`, reviewroute);

app.listen(3000, ()=>{
    console.log(api);
    console.log("Server is running...")
})




//WORKING:
/*const express = require ('express');
const router = express.Router();
const {User} = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose =require('mongoose')




router.post('/change', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  console.log('Helo..........' ,userId, currentPassword, newPassword);

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID, ID wasnot correct' });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the current password provided by the user with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);

    // Update the user's password in the database
    user.passwordHash = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
    try {
      const  {id}  = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid users ID',
        });
      }
      console.log(id);
    
     
      // Find the user in the database by id and update their data
      const updatedUser = await User.findByIdAndUpdate(id,   {
        name: req.body.name,
      // passwordHash: bcrypt.hashSync(req.body.password, 10),
       email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        shippingAddress: req.body.shippingAddress,
        country: req.body.country,
        birthday: req.body.birthday,
        gender: req.body.gender,
      }, { new: true });
      console.log(updatedUser);
  
      if (updatedUser) {
        res.json({
          success: true,
          message: 'User data updated successfully',
          user: updatedUser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating user data',
        error: error.message,
      });
      console.log("5000 ERROR")
    }

  });

router.post('/login', async(req,res)=>{
    let secret = process.env.secret;
    let user = await User.findOne({email:req.body.email})
    if(!user)
    {
        res.status(400).send("User not Found")
    }
    else if(user && bcrypt.compareSync(req.body.password,user.passwordHash))
    {
        const token = jwt.sign({
            userId:user.id,
            isAdmin:user.isAdmin
        },
        secret,
        {
            expiresIn:'1d'
        })
        res.status(200).send({user:user.email, token:token});
    }
    else{
        res.status(400).send("Incorrect Password");
    }
});

router.post('/register',async (req,res)=>{
    let userlist =  new User(
        {
            name:req.body.name, 
            // passwordHash:req.body.passwordHash,
            passwordHash:bcrypt.hashSync( req.body.password,10),
            email:req.body.email,
            phone:req.body.phone,
            city:req.body.city,  
            zip:req.body.zip, 
            appartment:req.body.appartment, 
            country:req.body.country, 
            street:req.body.street,
            isAdmin:req.body.isAdmin

        }
    
    );
    userlist = await userlist.save();
    if(userlist){
      res.send("User have registered");
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})

router.get('/',async (req,res)=>{
    const userlist = await User.find().select('-passwordHash');
    if(userlist){
        res.send(userlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
router.post('/',async (req,res)=>{
    let userlist = await User(
        {
            name:req.body.name, 
            passwordHash:bcrypt.hashSync( req.body.passwordHash,10),
            email:req.body.email,
            phone:req.body.phone,  
        }
    
    );
    userlist = await userlist.save();
    if(userlist){
      res.send(userlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID',
    });
  }

  console.log('Fetching user with ID:', id);

  try {
    let userlist = await User.findById(id);
    console.log('User data:', userlist);
    if (userlist) {
      res.status(200).json(userlist);
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user data',
      error: error.message,
    });
  }
});

// router.post('/login', async(req,res)=>{
//     let secret = process.env.secret;
//     let user = await User.findOne({email:req.body.email})
//     if(!user)
//     {
//         res.status(400).send("User not Found")
//     }
//     if(user && bcrypt.compareSync(req.body.passwordHash,user.passwordHash))
//     {
//         const token = jwt.sign({
//             userId:user.id
//         },
//         secret,
//         {
//             expiresIn:'1d'
//         })
//         res.status(200).send({user:user.email, token:token});
//     }
//     else{
//         res.status(400).send("Incorrect Password");
//     }

// })


router.get('/get/count',async (req,res)=>{
    const usercount = await User.countDocuments({}).then(count => {
        res.send({Totalcount:count});
    })
    .catch(err => {
        console.error(err);
    });
    if(usercount){
        res.send(
            {count:
                usercount});
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(user)
        {
           return res.status(300).json({success:true, message:"User deleted"}
            )
        }
        else{
            return res.status(101).send("User Not deleted")
        }
    }).catch(err=>{
     return res.status(400).json({
        success:false,
        message:"Not connected"
     })
    })
});
module.exports=router;*/


//Mine:


const {generateOTP,sendMail}=require('../utils/mail')
const { isValidObjectId } = require('mongoose');
const secret= process.env.secret;
const {sendError}=require('../utils/helper')
const { forgotPassword,resetPassword } = require('../controllers/user');
const VerificationToken = require('../models/verificationToken')
const express = require ('express');
const router = express.Router();
const {User} = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose =require('mongoose')




router.post('/change', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  console.log('Helo..........' ,userId, currentPassword, newPassword);

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID, ID wasnot correct' });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the current password provided by the user with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);

    // Update the user's password in the database
    user.passwordHash = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
    try {
      const  {id}  = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid users ID',
        });
      }
      console.log(id);
    
     
      // Find the user in the database by id and update their data
      const updatedUser = await User.findByIdAndUpdate(id,   {
        name: req.body.name,
      // passwordHash: bcrypt.hashSync(req.body.password, 10),
       email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        shippingAddress: req.body.shippingAddress,
        country: req.body.country,
        birthday: req.body.birthday,
        gender: req.body.gender,
      }, { new: true });
      console.log(updatedUser);
  
      if (updatedUser) {
        res.json({
          success: true,
          message: 'User data updated successfully',
          user: updatedUser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating user data',
        error: error.message,
      });
      console.log("5000 ERROR")
    }

  });

 
  router.post('/login', async(req,res)=>{
    let secret = process.env.secret;
    let user = await User.findOne({email:req.body.email})
    if(!user)
    {
        res.status(400).send("User not Found")
    }
    if (!user.verified) {
      // If the user's email is not verified, send a 403 response with the message "Email not verified"
      return res.status(403).send("Email not verified. Please verify your email first.");
  }

    else if(user && bcrypt.compareSync(req.body.password,user.passwordHash))
    {
        const token = jwt.sign({
            userId:user.id,
            isAdmin:user.isAdmin
        },
        secret,
        {
          expiresIn:'1d'
      })
      res.status(200).send({user:user.email, token:token});
  }
  else{
      res.status(400).send("Incorrect Password");
  }
}); 
  
//OTP verification
router.post('/verify', async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim()) return sendError(res, 'Invalid req, missing parameters');
  
  if (!isValidObjectId(userId)) return sendError(res, 'Invalid userID');

  const user = await User.findById(userId);
  console.log('User:', user); // <-- Log the user object to the console
  if (!user) return sendError(res, 'Sorry user not found');

  if (user.verified) return sendError(res, 'Account is already verified');

  const token = await VerificationToken.findOne({ owner: user._id });
  console.log('Token:', token); // <-- Log the token object to the console
  if (!token) return sendError(res, 'Sorry user not found ok.');

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, 'please provide a valid token ');

  user.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();
  await sendMail(user.email, "Welcome email", `<h1>Email verified successfully</h1>`);

res.json({ success: true, message: 'your email is verified' ,
user:{name:user.name,email:user.email,id:user._id},

});
});

router.post('/register', async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('Email is already registered');
    }

    // Create a new user object
    let user = new User({
      name: req.body.name,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      zip: req.body.zip,
      appartment: req.body.appartment,
      country: req.body.country,
      street: req.body.street,
      isAdmin: req.body.isAdmin
    });

    // Generate OTP and create a verification token
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: user._id,
      token: OTP,
    });

    // Save the verification token
    const savedVerificationToken = await verificationToken.save();
    if (!savedVerificationToken) {
      return res.status(404).send('VerificationToken cannot be saved');
    }

    // Save the user
    user = await user.save();
    if (!user) {
      return res.status(404).send('User cannot be created');
    }

    // Send email with OTP for verification
    await sendMail(user.email, 'Verify your account', `Your OTP is ${OTP}`);

    // Return the user and verification token data in the response
    res.json({
      OTP,
      user: user,
      verificationToken: savedVerificationToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//Forgot Password
router.post("/forgot-password",forgotPassword);
//Reset password
router.post("/reset-password",resetPassword);

router.get('/',async (req,res)=>{
    const userlist = await User.find().select('-passwordHash');
    if(userlist){
        res.send(userlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})
router.post('/',async (req,res)=>{
    let userlist = await User(
        {
            name:req.body.name, 
            passwordHash:bcrypt.hashSync( req.body.passwordHash,10),
            email:req.body.email,
            phone:req.body.phone,  
        }
    
    );
    userlist = await userlist.save();
    if(userlist){
      res.send(userlist);
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID',
    });
  }

  console.log('Fetching user with ID:', id);

  try {
    let userlist = await User.findById(id);
    console.log('User data:', userlist);
    if (userlist) {
      res.status(200).json(userlist);
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user data',
      error: error.message,
    });
  }
});

// router.post('/login', async(req,res)=>{
//     let secret = process.env.secret;
//     let user = await User.findOne({email:req.body.email})
//     if(!user)
//     {
//         res.status(400).send("User not Found")
//     }
//     if(user && bcrypt.compareSync(req.body.passwordHash,user.passwordHash))
//     {
//         const token = jwt.sign({
//             userId:user.id
//         },
//         secret,
//         {
//             expiresIn:'1d'
//         })
//         res.status(200).send({user:user.email, token:token});
//     }
//     else{
//         res.status(400).send("Incorrect Password");
//     }

// })


router.get('/get/count',async (req,res)=>{
    const usercount = await User.countDocuments({}).then(count => {
        res.send({Totalcount:count});
    })
    .catch(err => {
        console.error(err);
    });
    if(usercount){
        res.send(
            {count:
                usercount});
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(user)
        {
           return res.status(300).json({success:true, message:"User deleted"}
            )
        }
        else{
            return res.status(101).send("User Not deleted")
        }
    }).catch(err=>{
     return res.status(400).json({
        success:false,
        message:"Not connected"
     })
    })
});





module.exports=router;
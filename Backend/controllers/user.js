

const { sendError } = require("../utils/helper");
const {sendMail}=require('../utils/mail')
const { User } = require('../models/user');
const ResetToken = require('../models/Resettoken');
const bcrypt = require('bcrypt');

function getRandomFourDigitNumber() {
  const min = 1000; // Minimum four-digit number (inclusive)
  const max = 9999; // Maximum four-digit number (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return sendError(res, 'Please provide a valid email');

  
    const user = await User.findOne({ email });
    if (!user)
      return sendError(res, 'User not found! Invalid request');

    const existingToken = await ResetToken.findOne({ owner: user._id });
    if (existingToken)

      {console.log(existingToken)
        return sendError(res, 'After one hour, you can request for another token');
    
    }

    const newToken = getRandomFourDigitNumber().toString();
    const resetTokenEntry = new ResetToken({ owner: user._id, token: newToken });
    await resetTokenEntry.save();
    console.log(newToken);
    // Add the appropriate implementation for sendMail based on your setup
    await sendMail(user.email, "Password Reset Token:", newToken);
     res.json({
      success: true,
      message: "Password reset code is:",
      resetCode: newToken // Include the reset code in the response
    });
  } 






exports.resetPassword = async (req, res) => {
  const { email, resetCode, password, confirmPassword } = req.body;

  if (!email || !resetCode || !password || !confirmPassword) {
    return sendError(res, 'Please provide a valid email, reset code, password, and confirmPassword.');
  }

  if (password !== confirmPassword) {
    return sendError(res, 'Password and confirmPassword do not match.');
  }

  if (password.trim().length < 8 || password.trim().length > 20) {
    return sendError(res, "Password must be 8 to 20 characters long.");
  }

  try {
    console.log("Step 1: Finding the user based on the provided email...");
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      
      return sendError(res, "User not found.");
    }

    console.log("Step 2: Finding the reset token entry based on the user's owner ID in the database...");
    const resetTokenEntry = await ResetToken.findOne({ owner: user.id });
    if (!resetTokenEntry) {
      return sendError(res, "UserAVAILNOTABLE.");
    }

    console.log("Step 3: Checking if the provided resetCode matches the token in the database...");
    const isResetCodeValid = await resetTokenEntry.compareToken(resetCode);
    if (!isResetCodeValid) {
      return sendError(res, "Invalid reset code.");
    }

    console.log("Step 4: Updating the user's password...");
    console.log(user.passwordHash)
    user.password = password.trim();
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.passwordHash = hashedPassword;
    await user.save();
    console.log(user)

    console.log("Step 5: Deleting the reset token entry after successful password reset...");
    const deleteResult = await ResetToken.deleteOne({ _id: resetTokenEntry._id });
    console.log("Delete result:", deleteResult);
    await sendMail(user.email, "Password Reset Succesfully",'Now you can login with new password')

    // Send a success response
    res.json({
      success: true,
      message: `Password reset successfully: ${password}`
    });
    
    
  } catch (error) {
    // Handle the error and send an appropriate response
    console.error("Error during password reset:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password"
    });
  }
};

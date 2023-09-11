const jwt = require("jsonwebtoken");
require("dotwnv").config();
const User = require("../models/User");
// auth

exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer", "");

    // if token is missing, then return response

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    // verify the token
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        // verfication issue
        succes: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        succes: false,
        message: "This is not protected route for Students only",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// isInstructor

exports.isInstructor = async (req, res, next) => {
    try {
      if (req.user.accountType !== "Instructor") {
        return res.status(401).json({
          succes: false,
          message: "This is not protected route for Instructor only",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role cannot be verified, please try again",
      });
    }
  };

// isAdmin

xports.isAdmin = async (req, res, next) => {
    try {
      if (req.user.accountType !== "Admin") {
        return res.status(401).json({
          succes: false,
          message: "This is not protected route for Admin only",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role cannot be verified, please try again",
      });
    }
  };


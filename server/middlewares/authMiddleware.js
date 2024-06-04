import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

      // get user from token
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
  next();
});

const roles = {
  ADMIN: "admin",
  USER: "user",
};

const authorize = (req, res, next) => {
  if (req.user && req.user.role === roles.ADMIN) {
    next();
  } else {
    res.status(403);
    throw new Error("Forbidden");
  }
};

export { protect, authorize };

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// const response = await fetch(`http://localhost:3000/api/books`, {
//   method: "POST",
//   body: JSON.stringify({
//     title,
//     caption,
//   }),
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers("Authorization").replace("Bearer ", "");
    if (!token)
      return response(
        res,
        401,
        "No authentication token provided, access denied",
        null
      );

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Token is not valid, access denied" });

    //attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error", error.message);
    res.status(401).json({ message: "Token is not valid, access denied" });
  }
};

export default protectRoute;

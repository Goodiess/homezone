import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Agent from "../models/agentModel.js";
import Client from "../models/userMode.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    if (!jwt) {
      throw new Error("jsonwebtoken module is not defined.");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }

    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    let user;
    if (decoded.userType === 'type1') {  // Assuming `userType` in the token indicates which model to use
      user = await Agent.findById(decoded.userId).select("-password");
    } else if (decoded.userType === 'type2') {
      user = await Client.findById(decoded.userId).select("-password");
    } else {
      throw new Error("Invalid user type.");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute:", err);
    res.status(500).json({ message: err.message });
  }
};

export default protectRoute;

import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Authorization header missing or malformed"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) return next(createError(401, "Token not provided"));

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(createError(403, "Invalid or malformed token"));
    } else if (err.name === "TokenExpiredError") {
      return next(createError(403, "Token has expired"));
    } else {
      return next(createError(500, "Internal Server Error"));
    }
  }
};

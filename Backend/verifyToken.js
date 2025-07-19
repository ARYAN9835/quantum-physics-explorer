import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const token = req.cookies.access_token || tokenFromHeader;

  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = user.id; // use req.userId in controllers
    next();
  });
};

import { verifyToken } from "../utils/jwt.js";

export const verify = (req, res, next) => {
  try {
    const refreshToken = req?.cookies?.token;
    if (!refreshToken)
      return res.status(403).json({ message: "Token is not found" });
    
    const decoded = verifyToken(refreshToken);
    console.log(decoded);
    
    // FIX: Standardize the user object
    // If your token has 'id', we map it to '_id' so the controller works
    req.user = {
      _id: decoded.id || decoded._id || decoded.userId, 
      ...decoded
    };
    
    console.log('req.user fixed :>> ', req.user); // Check if _id now exists
    next();
  } catch (error) {
    console.log(error); // Log the error to see why it fails
    res.status(401).json({ message: "Unauthorized request" });
  }
};
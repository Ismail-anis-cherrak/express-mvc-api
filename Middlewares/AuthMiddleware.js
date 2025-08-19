import jwt from 'jsonwebtoken'

const jwt_Secret = "mysecretkey32222@@!#";
const AuthMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, jwt_Secret);
      req.user = decoded; // Attach user info to request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }
};
export default AuthMiddleware;

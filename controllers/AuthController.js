import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const jwtSecret ="mysecretkey32222@@!#";

const AuthController = {
  register: async (req, res) => {
    try {
      const { username,email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email and password are required" });
      }

      // check if user exists
      const existing = await User.findOne({ username });
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username,email,  password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  login: async (req, res) => {
  try {
    const { username, password } = req.body;

    // check user by username OR email
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
},


  getProfile: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findById(decoded.id).select("-password"); // exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  },
};
export default AuthController;

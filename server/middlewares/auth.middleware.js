 import jwt from "jsonwebtoken"
 const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing. Login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body = req.body || {};       // 🔥 FIX
    req.body.userId = decoded.id;    // safe now

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default verifyJWT
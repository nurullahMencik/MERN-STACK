// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkisiz erişim. Token yok." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 👈 Artık req.user içeriği: { id, username, isAdmin }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

module.exports = verifyToken;

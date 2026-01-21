import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Hanya untuk admin
export const adminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Admin only" });
  }

  next();
};

// Hanya untuk cashier
export const cashierMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

  if (req.user.role !== "cashier") {
    return res.status(403).json({ success: false, message: "Forbidden: Cashier only" });
  }

  next();
};

export const roleMiddleware = (allowedRoles) => (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Forbidden: ${allowedRoles.join(", ")} only`,
    });
  }

  next();
};

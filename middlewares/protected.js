import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const ProtectedRoute = (req, res, next) => {
  const shortlived = req.cookies.hellomiss;
  //   console.log("short lived token => ", shortlived);
  if (!shortlived)
    return res.status(401).json({ valid: true, message: "Unauthorized" });

  jwt.verify(shortlived, process.env.BLABLA, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: true, message: "Unauthorized" });
    }

    const validUser = await User.findById(decoded.access2).exec();
    if (!validUser) {
      return res
        .status(404)
        .json({ valid: false, message: "No valid Details found" });
    }

    const { password, ...rest } = validUser._doc;

    req.user = rest;
    next();
  });
};

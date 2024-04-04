import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkAndRenewToken = (req, res, next) => {
  const shortlived = req.cookies.hellomiss;
  const longlived = req.cookies.hellobro;
  console.log("short lived token => ", shortlived);
  console.log("long lived", longlived);

  if (!shortlived) {
    if (!longlived) {
      return res.status(404).json({ valid: false, message: "Nothing found" });
    } else {
      jwt.verify(longlived, process.env.BLAREFBLA, async (err, decoded) => {
        console.log("decoded from renew => ", decoded);
        if (err) {
          return res
            .status(404)
            .json({ valid: false, message: "Nothing found from reset token" });
        } else {
          // checking the decoded
          // req.id = decoded.access2;
          const validuser = await User.findById(decoded.access2).exec();
          // console.log("the request id from renew => ", req.id);
          console.log("the valid user from renew => ", validuser);
          // console.log("the request from rtefresh => ", req);
          if (!validuser) {
            return res
              .status(404)
              .json({ valid: false, message: "No details found from renew" });
          }
          const accessToken = jwt.sign(
            {
              access1: validuser?.username,
              access2: validuser?._id,
            },
            process.env.BLABLA,
            {
              expiresIn: "60s",
            }
          );

          console.log("the new access token => ", accessToken);
          res.cookie("hellomiss", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 1000,
          });
          next(); // Call next middleware
        }
      });
    }
  } else {
    jwt.verify(shortlived, process.env.BLABLA, async (err, decoded) => {
      console.log("the decoded user => ", decoded);
      if (err) {
        return res.status(404).json({ valid: false, message: "Nothing found" });
      } else {
        req.id = decoded.access2;
        // checking the decoded
        const validuser = await User.findById(decoded.access2).exec();
        console.log("request id => ", req.id);
        console.log("the valid user from reset => ", validuser);
        if (!validuser) {
          return res
            .status(404)
            .json({ valid: false, message: "No valid Details found" });
        }
        next(); // Call next middleware
      }
    });
  }
};

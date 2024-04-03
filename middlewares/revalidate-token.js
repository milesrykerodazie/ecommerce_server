import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const renewToken = (req, res) => {
  const longlived = req.cookies.hellobro;
  console.log("long lived", longlived);
  let exist = false;
  if (!longlived) {
    return res.status(404).json({ valid: false, message: "Nothing found" });
  } else {
    jwt.verify(longlived, process.env.BLAREFBLA, async (err, decoded) => {
      if (err) {
        return res.status(404).json({ valid: false, message: "Nothing found" });
      } else {
        // checking the decoded
        const validuser = await User.findOne({ id: decoded.access2 }).exec();

        console.log(validuser);
        // console.log("the request from rtefresh => ", req);
        if (validuser) {
          const accessToken = jwt.sign(
            {
              access1: validuser.username,
              access2: validuser._id,
            },
            process.env.BLABLA,
            {
              expiresIn: "5m",
            }
          );
          res.cookie("hellomiss", accessToken, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 60 * 1000,
          });
          exist = true;
        }
      }
    });
  }

  return exist;
};
export const isResetTokenValid = async (req, res, next) => {
  const shortlived = req.cookies.hellomiss;
  console.log("short lived => ", shortlived);

  if (!shortlived) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(shortlived, process.env.BLABLA, async (err, decoded) => {
      if (err) {
        return res.status(404).json({ valid: false, message: "Nothing found" });
      } else {
        // checking the decoded
        const validuser = await User.findOne({ id: decoded.access2 }).exec();

        if (validuser) {
          req.id = decoded.access2;
          next();
        }
      }
    });
  }
};

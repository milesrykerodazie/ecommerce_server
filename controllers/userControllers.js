import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    // const { name, email, username, sex, password } = req.body;
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.username ||
      !req.body.sex ||
      !req.body.password
    ) {
      res.status(400).json({
        success: false,
        message: "All required feilds needed.",
      });
      return;
    }

    //check for already existing email
    const existingEmail = await User.findOne({ email: req.body.email }).exec();
    //check for already existing username
    const existingusername = await User.findOne({
      username: req.body.username,
    }).exec();

    if (existingEmail) {
      res.status(409).json({
        success: false,
        message: "Email already in use, choose another.",
      });
      return;
    }

    if (existingusername) {
      res.status(409).json({
        success: false,
        message: "Username already in use, choose another.",
      });
      return;
    }

    //password encryption here
    const salt = await bcrypt.genSalt(15);
    const encrypedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      password: encrypedPassword,
      name: req.body.name,
      email: req.body.email,
      username: req.body.User,
      sex: req.body.sex,
    });

    const { password, ...rest } = newUser;
    res.status(201).json({
      success: true,
      message: "User Registered successfully.",
      newUser: rest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not created.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check if email is valid in the database
  const validEmail = await User.findOne({ email: email }).exec();

  if (!validEmail) {
    res.status(404).json({
      success: false,
      message: "Invalid credentials.",
    });
    return;
  }

  //check if the password is correct
  const validPassword = await bcrypt.compare(password, validEmail.password);

  if (!validPassword) {
    res.status(409).json({
      success: false,
      message: "Invalid credentials.",
    });
    return;
  }

  //we will generate our access token and refresh token using jwt
  const accessToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.BLABLA,
    {
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    {
      access1: validEmail.username,
      access2: validEmail._id,
    },
    process.env.BLAREFBLA,
    {
      expiresIn: "1d",
    }
  );

  //push to cookies
  res.cookie("hellomiss", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 60 * 1000,
  });
  res.cookie("hellobro", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful.",
  });
};

const validateToken = (req, res) => {
  const found = req.cookies;
  console.log("the found => ", found.hellobro);
  res.status(200).json({
    message: "api hit",
  });
};

export { register, login, validateToken };

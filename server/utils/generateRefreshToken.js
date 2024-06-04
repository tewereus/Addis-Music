import jwt from "jsonwebtoken";

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "3d",
  });

  /*res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // this will make the site https but need to be in production not in development, because localhost runs on http not https
    sameSite: "strict", // prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // maxAge needs to be set in milliseconds
  });*/
};

export default generateRefreshToken;

const jwt = require("jsonwebtoken");
const userModel = require("../users/userModel");
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new Error("token incorrecto");
    }
    const { user } = tokenData;
    console.log(user);
    let [userDB] = await userModel.findById(user.id);
    if (!userDB) {
      return res.sendStatus(403);
    }
    req.user = userDB[0];
    next();
  } else {
    res.status(401).json({ message: "You must be logged in to do that" });
  }
};
module.exports = authenticateUser;

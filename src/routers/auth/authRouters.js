const authControllers = require("../../controllers/auth/authControllers");
const express = require("express");
const authRouters = express.Router();
const uploadProfile = require("../../middlewares/CloundinaryStorage");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const accessTokenMiddleware = require("../../middlewares/accessTokenMiddleWare");
authRouters.post(
  "/register",
  uploadProfile.single("avatar_profile"),
  authMiddleware.registerValid,
  authControllers.register
);

authRouters.post("/login", authMiddleware.loginValid, authControllers.login);
authRouters.get(
  "/get-all-users",
  accessTokenMiddleware.accountPermission,
  authControllers.getAllUsers
);
authRouters.get(
  "/get-me",
  accessTokenMiddleware.accessToken,
  authControllers.getMe
);
module.exports = authRouters;

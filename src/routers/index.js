const authRouters = require("./auth/authRouters");

const AppRouters = (app) => {
  app.use("/v1/users/", authRouters);
};

module.exports = AppRouters;

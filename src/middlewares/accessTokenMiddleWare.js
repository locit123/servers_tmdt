const jwt = require("jsonwebtoken");
const accessTokenMiddleware = {
  accessToken: async (req, res, next) => {
    try {
      //req headers
      const requestToken = req.headers.token;
      if (requestToken) {
        const token = requestToken.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
          if (err) {
            return res
              .status(403)
              .json({ status: false, message: "token invalid" });
          }
          req.user = decode;

          next();
        });
      } else {
        return res.status(401).json({
          EM: "You are not logged in! Please log in to get access.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "access token failed" });
    }
  },
  accountPermission: (req, res, next) => {
    accessTokenMiddleware.accessToken(req, res, () => {
      if (req.user.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          status: false,
          message: "you do not have access",
        });
      }
    });
  },
};

module.exports = accessTokenMiddleware;

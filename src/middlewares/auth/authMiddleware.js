const authMiddleware = {
  registerValid: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
        return res.status(401).json({
          status: false,
          message: "invalid userName with email and password",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  },
  loginValid: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          status: false,
          message: "invalid email and password",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  },
};

module.exports = authMiddleware;

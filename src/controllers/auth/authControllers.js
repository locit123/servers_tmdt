const authServices = require("../../services/auth/authService");
const authControllers = {
  register: async (req, res) => {
    try {
      const file = req.file;
      const response = await authServices.registerService(req.body, file);
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: "register err" });
    }
  },
  login: async (req, res) => {
    try {
      const response = await authServices.loginService(req.body);
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: "login err" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const response = await authServices.getAllUsersService();
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: "getAllUsers err" });
    }
  },
  getMe: async (req, res) => {
    try {
      const id = req.user.id;
      const response = await authServices.getMeService(id);
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error, message: "getMe err" });
    }
  },
};

module.exports = authControllers;

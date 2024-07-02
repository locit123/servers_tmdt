const db = require("../../models/index");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// Store hash in your password DB.
const hashPassword = async (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
//unique Email
const uniqueEmail = async (email) => {
  const uEmail = await db.Users.findOne({ where: { email: email } });
  if (uEmail) {
    return true;
  }
  return false;
};
//unique Phone Number
const uniquePhoneNumber = async (phoneNumber) => {
  const uPhoneNumber = await db.Users.findOne({
    where: { phoneNumber: phoneNumber },
  });
  if (uPhoneNumber) {
    return true;
  } else {
    return false;
  }
};
//comparePassword-Mã Hóa ngược lại
const comparePassword = (password, hPassword) => {
  const cpPassword = bcrypt.compareSync(password, hPassword);
  return cpPassword;
};

//JWT
const generaAccessToken = async (id, role) => {
  const accessToken = await jwt.sign({ id, role }, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });
  return accessToken;
};

const authServices = {
  registerService: async (data, file) => {
    try {
      const path =
        "https://res.cloudinary.com/dkdb0btrn/image/upload/v1719908859/profile/ylz6ywmg0rgwxzkznofx.jpg";
      console.log(data, file, "<<<<<<<<<<<<<<<<<<");
      const {
        userName,
        email,
        password,
        avatar,
        firstName,
        lastName,
        phoneNumber,
        role,
      } = data;
      //hash password
      const hPassword = await hashPassword(password);
      //request email
      const cEmail = await uniqueEmail(email);
      if (file) cloudinary.uploader.destroy(file.filename);
      if (cEmail === true) {
        return {
          status: false,
          messages: "email đã tồn tại",
        };
      }
      //request password
      const cPhoneNumber = await uniquePhoneNumber(phoneNumber);
      if (file) cloudinary.uploader.destroy(file.filename);
      if (cPhoneNumber === true) {
        return {
          status: false,
          messages: "phone đã tồn tại",
        };
      }

      const result = await db.Users.create({
        userName: userName,
        email: email,
        password: hPassword,
        avatar: avatar || path,
        firstName: firstName || "vo",
        lastName: lastName || "danh",
        phoneNumber: phoneNumber,
        role: role || "client",
      });
      if (result) {
        return {
          status: result ? "success" : "error",
          messages: "register success",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        messages: "registerService error",
      };
    }
  },
  loginService: async (data) => {
    try {
      const { email, password } = data;
      const cEmail = await db.Users.findOne({ where: { email: email } });
      if (cEmail) {
        //compare Password
        const cPassword = await comparePassword(password, cEmail.password);

        const newUser = {
          userName: cEmail.userName,
          email: cEmail.email,
          avatar: cEmail.avatar,
          firstName: cEmail.firstName,
          lastName: cEmail.lastName,
          phoneNumber: cEmail.phoneNumber,
        };
        //jwt token
        const accessToken = await generaAccessToken(cEmail.id, cEmail.role);

        if (cPassword) {
          return {
            status: true,
            message: { accessToken, newUser },
          };
        } else {
          return {
            status: false,
            message: "email or password does not exist?",
          };
        }
      } else {
        return {
          status: false,
          message: "email or password does not exist.?",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        messages: "loginService error",
      };
    }
  },
  getAllUsersService: async () => {
    try {
      const result = await db.Users.findAll({
        attributes: {
          exclude: ["password", "role"],
        },
        raw: true,
      });
      if (result) {
        return {
          status: true,
          data: result,
        };
      } else {
        return {
          status: false,
          message: "get all failed",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        messages: "getAllUsersService error",
      };
    }
  },
  getMeService: async (id) => {
    try {
      const result = await db.Users.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password", "role"],
        },
      });
      if (result) {
        return {
          status: true,
          data: result,
        };
      } else {
        return {
          status: false,
          message: "id not found",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        messages: "getMe error",
      };
    }
  },
};

module.exports = authServices;

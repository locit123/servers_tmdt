"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // Hoặc true nếu cột có thể NULL
      defaultValue: "client", // Giá trị mặc định nếu cần thiết
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "role");
  },
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING(50),
    email: DataTypes.STRING(254),
    hashed_password: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.List, { foreignKey: 'user_Id' })
    User.hasMany(models.Task, { foreignKey: 'user_Id' })
  };
  return User;
};

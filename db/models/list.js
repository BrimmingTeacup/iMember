'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    user_Id: DataTypes.INTEGER
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.belongsTo(models.User, { foreignKey: 'user_Id' })
    List.hasMany(models.Task, { foreignKey: 'list_Id' })
  };
  return List;
};

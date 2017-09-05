module.exports = function(sequelize, DataTypes) {
  
  var Centers = sequelize.define("Centers", {

    centerName: DataTypes.STRING,
    centerAddress: DataTypes.STRING

  });

  return Centers;

};
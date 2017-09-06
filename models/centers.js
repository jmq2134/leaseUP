module.exports = function(sequelize, DataTypes) {
  
  var Centers = sequelize.define("Centers", {

    centerName: DataTypes.STRING,
    centerAddress: DataTypes.STRING

  });

  Centers.associate = function(models) {

    Centers.hasMany(models.Tenants, {
      onDelete: "cascade"
    });

  };

  return Centers;

};
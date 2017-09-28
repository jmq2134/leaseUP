'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  
  var Centers = sequelize.define("Centers", {

    centerName: DataTypes.STRING,
    centerStreet: DataTypes.STRING,
    centerCity: DataTypes.STRING,
    centerState: DataTypes.STRING, 
    centerZip: DataTypes.STRING,

  });

  Centers.associate = function(models) {

    Centers.hasMany(models.Tenants, {
      onDelete: "cascade"
    });

  };

  return Centers;

};
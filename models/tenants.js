'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  
  var Tenants = sequelize.define("Tenants", {

    tenantName: DataTypes.STRING,
    tenantSF: DataTypes.STRING,
    leaseStart: DataTypes.STRING,
    leaseEnd: DataTypes.BOOLEAN,
    basePSF: DataTypes.STRING,
    camPSF: DataTypes.STRING,
    totalPSF: DataTypes.STRING,
    annualRent: DataTypes.STRING,
    salesPSF: DataTypes.STRING,
    annualSales: DataTypes.STRING,
    occupancy: DataTypes.STRING,
    noticeDate: DataTypes.STRING,
    noticeRent: DataTypes.STRING

  });

  // Tenants.associate = function(models) {

  //   Tenants.hasOne(models.Centers, {
  //     onDelete: "cascade"
  //   });

  // };
  return Tenants;
};
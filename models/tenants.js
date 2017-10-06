'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize) {

    var Tenants = sequelize.define("Tenants", {

        tenantName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tenantSF: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        leaseStart: {
            type: Sequelize.STRING,
            allowNull: true
        },
        leaseEnd: {
            type: Sequelize.STRING,
            allowNull: true
        },
        basePSF: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        camPSF: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        totalPSF: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        annualRent: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        salesPSF: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        annualSales: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        occupancy: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        noticeDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        noticeRent: {
            type: Sequelize.DECIMAL,
            allowNull: true
        }
    });

    Tenants.associate = function(models) {

        Tenants.belongsTo(models.Centers, {
            onDelete: "cascade"
        });

    };
    return Tenants;
};
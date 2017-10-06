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
            type: Sequelize.STRING,
            allowNull: true
        },
        camPSF: {
            type: Sequelize.STRING,
            allowNull: true
        },
        totalPSF: {
            type: Sequelize.STRING,
            allowNull: true
        },
        annualRent: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salesPSF: {
            type: Sequelize.STRING,
            allowNull: true
        },
        annualSales: {
            type: Sequelize.STRING,
            allowNull: true
        },
        occupancy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        noticeDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        noticeRent: {
            type: Sequelize.STRING,
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
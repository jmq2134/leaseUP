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
            type: Sequelize.INTEGER,
            allowNull: true
        },
        camPSF: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        totalPSF: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        annualRent: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        salesPSF: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        annualSales: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        occupancy: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        noticeDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        noticeRent: {
            type: Sequelize.INTEGER,
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
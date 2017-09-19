'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize) {

    var Tenants = sequelize.define("Tenants", {

        tenantName: {
            type: Sequelize.STRING,
            defaultValue: 'Vacant'
        },
        tenantSF: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        leaseStart: {
            type: Sequelize.STRING,
            defaultValue: '0'
        },
        leaseEnd: {
            type: Sequelize.STRING,
            defaultValue: '0'
        },
        basePSF: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        camPSF: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        totalPSF: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        annualRent: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        salesPSF: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        annualSales: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        occupancy: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        noticeDate: {
            type: Sequelize.STRING,
            defaultValue: '0'
        },
        noticeRent: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        }
    });

    Tenants.associate = function(models) {

        Tenants.belongsTo(models.Centers, {
            onDelete: "cascade"
        });

    };
    return Tenants;
};
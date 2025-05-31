'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cpu extends Model {
    static associate(models) {
      Cpu.hasMany(models.Phone, {
        foreignKey: 'cpu_id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  Cpu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      manifacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cpu',
      underscored: true,
    }
  );
  return Cpu;
};

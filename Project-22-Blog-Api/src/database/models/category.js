'use strict';

module.exports = (Sequelize, DataTypes) => {
  const Category = Sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  })
  return Category;
}
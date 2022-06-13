'use strict';

module.exports = (Sequelize, DataTypes) => {
  const BlogPost = Sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
  }, {
      timestamps: false,
    })

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return BlogPost;
}

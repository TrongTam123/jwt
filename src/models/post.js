'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Post.hasMany(models.User, {foreignKey: 'postId'})
      Post.hasMany(models.Comment, {foreignKey: 'postId'})
      Post.belongsToMany(models.Tag, {
        through: 'Post_Tag',
        foreignKey: 'postId'
      })
    }
  };

  //object relational mapping
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    datePost: DataTypes.STRING,
    img: DataTypes.STRING,
    comments: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
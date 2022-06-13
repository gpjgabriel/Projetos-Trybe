const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, User, Category } = require('../database/models');

const msgError = (status, message) => ({
  status,
  message,
});

const createPost = async (dataPost) => {
  const fnTransaction = await sequelize.transaction();
  
  try {
    const { title, content, userId, categoryIds } = dataPost;
  
    const newPost = await BlogPost.create(
      { title, content, userId }, { transaction: fnTransaction },
    );
    await newPost.addCategories(categoryIds, { transaction: fnTransaction });
  
    await fnTransaction.commit();
  
    return newPost;
  } catch (error) {
    await fnTransaction.rollback();
    throw msgError(400, '"categoryIds" not found');
  }
};

const getAllPost = async () => {
  const getPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  return getPosts;
};

const getPostId = async (id) => {
  const getPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!getPost) throw msgError(404, 'Post does not exist');
  
  return getPost;
};

const editPost = async (dataPost) => {
  const { id, title, content, userId } = dataPost;

  await BlogPost.update({ title, content }, { where: { id, userId } });

  const postEdit = await getPostId(id);

  return postEdit;
};

module.exports = {
  createPost,
  getAllPost,
  getPostId,
  editPost,
};
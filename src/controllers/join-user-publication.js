const Users = require('../models/usersmodel');
const publicationModel = require('../models/publicationModel');
const CategoriesModel = require('../models/CategoriesModel');

exports.publicationJoin = async (req, res, next) => {
  Users.hasMany(publicationModel, {
    foreignKey: 'users_id'
  });

  publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
  const rawPublications = await publicationModel.findAll({
    include: [{
      model: Users,
    }]
  })
  const publication = rawPublications.map(p => (
    {
      id: p.id,
      title: p.title,
      condition: p.condition,
      price: p.price,
      description: p.description,
      image_name: p.image_name,
      wasPublishedAt: p.wasPublishedAt,
      users_id: p.users_id,
      categoryId: p.categoryId,
      user: p.user,
      image_name: p.image_name.split(',')
    }
  ));
  res.json(publication);
  next();
};
exports.myPublications = async (req, res, next) => {
  Users.hasMany(publicationModel, {
    foreignKey: 'users_id'
  });
  publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
  // console.log(req.body);
  const rawPublications = await publicationModel.findAll({
    where: {
      users_id: req.params.users_id
    },
    include: [{
      model: Users,
    }],
  })
  const publication = rawPublications.map(p => (
    {
      id: p.id,
      title: p.title,
      condition: p.condition,
      price: p.price,
      description: p.description,
      image_name: p.image_name,
      wasPublishedAt: p.wasPublishedAt,
      users_id: p.users_id,
      categoryId: p.categoryId,
      user: p.user,
      image_name: p.image_name.split(',')
    }
  ));
  res.json(publication);
  next();
};
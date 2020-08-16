const CategoriesModel = require('../models/categoriesModel');
const publicationModel = require('../models/publicationModel');
// const Users = require('../models/usersModel');

// exports.categories = async (req, res, next) => {
//     // console.log(CategoriesModel);
//     publicationModel.hasOne(categories, { foreignKey: 'categoryId' })
//     categories.belongsTo(publicationModel, { foreignKey: 'categoryId' });
//     const categories = await CategoriesModel.findAll(
//         {
//             include: {
//                 model: publicationModel,
//             }
//         }
//     )
//     res.json(categories)
// };





exports.categorieById = async (req, res, next) => {
    // console.log(CategoriesModel);
    const categories = await CategoriesModel.findByPk(req.params.id);
    res.json(categories);
};
const publicationModel = require('../../models/publicationModel');
const Users = require('../../models/usersmodel');
const CategoriesModel = require('../../models/categoriesModel');
const ProvinceModel = require('../../models/provinceModel');


exports.confingJoin = () => {
    Users.hasMany(publicationModel, {foreignKey : 'users_id'});
    publicationModel.belongsTo(Users, { foreignKey: 'users_id'});

    CategoriesModel.hasMany(publicationModel, { foreignKey: 'categoryId' });
    publicationModel.belongsTo(CategoriesModel, { foreignKey: 'categoryId' });
    // ProvinceModel.hasMany(Users, { foreignKey: 'province_id' });
    // Users.belongsTo(ProvinceModel, { foreignKey: 'province_id' });
}
exports.includeJoin = {
    include: [{ model: CategoriesModel }, {model : Users}],
    // require : true,
    /// orden by DESCENDENT
    attributes: ['id', 'title', 'condition', 'price', 'description', 'image_name', 'wasPublishedAt', 'users_id', 'categoryId'],
    order: [
        ['id', 'DESC']
    ],
};

// * ______________________________________________________________________________________________________________ * // 
// users join

exports.configJoinUser = () => {
    ProvinceModel.hasMany(Users, { foreignKey: 'province_id' });
    Users.belongsTo(ProvinceModel, { foreignKey: 'province_id' });
    Users.hasMany(publicationModel, { foreignKey: 'users_id' });
    publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
};
exports.includeJoinUser = {
     include: [{ model: ProvinceModel }, { model: publicationModel }],
    //  attributes : [ 'id','name' , 'lastname' , 'username' , 'password' , 'gender', 'phonenumber' , 'emai' , 'province_id' ],
    };



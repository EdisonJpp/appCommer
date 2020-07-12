const seguidoresModel = require('../models/seguidores');
const UserModel = require('../models/usersModel');



exports.getSeguidores = async (req, res, next) => {
    // UserModel.hasMany(seguidoresModel, { foreignkey: 'userId' });
    // seguidoresModel.belongsTo(UserModel, { foreignkey: 'userId' });

    UserModel.hasMany(seguidoresModel, { foreignkey: 'seguidoresId' });
    seguidoresModel.belongsTo(UserModel, { foreignkey: 'seguidoresId' });

    const data = await seguidoresModel.findAll({
        include: {
            model: UserModel,
        },
    });
    res.status(200).json(data);
};

exports.getSeguidorByid = async (req, res, next) => {
    try {
        UserModel.hasMany(seguidoresModel, { foreignKey: 'seguidoresId' });
        seguidoresModel.belongsTo(UserModel, { foreignKey: 'seguidoresId' });
        const data = await seguidoresModel.findAll({
            include: {
                model: UserModel,
            },
            where: {
                userId: req.params.userId
            },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);

    }
};

exports.addSeguidores = async (req, res, next) => {
    try {
        const { userId, seguidoresId } = new seguidoresModel(req.body);
        await seguidoresModel.create({
            userId, seguidoresId,
        });
        res.status(200).json({ message: 'add it correctly' });

    } catch (error) {

    }
};

exports.deleteSeguidor = async (req, res, next) => {
    try {
        const id = req.params.seguidoresId;
        await seguidoresModel.destroy({
            where: {
                seguidoresId: id
            }
        });
        res.status(200).json({ message: 'add it correctly' });
    } catch (error) {
        res.json(error);
    };
}
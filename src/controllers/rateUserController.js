// import { json } from 'sequelize/types';

const rateUserModel = require('../models/rateUserModel');
const usersModel = require('../models/usersModel');


exports.getRateUser = async (req, res, next) => {
    
    const data = await rateUserModel.findAll();

    res.json(data);
};


exports.getByUserId = async (req, res, next) => {
    try {
        usersModel.hasMany(rateUserModel, {foreignKey : 'userId'});
        rateUserModel.belongsTo(usersModel, {foreignKey : 'userId'});

        usersModel.hasMany(rateUserModel, {foreignKey : 'qualifierId'});
        rateUserModel.belongsTo(usersModel, {foreignKey : 'qualifierId'});
        const data = await rateUserModel.findAll({
            include:[{
                // model : usersModel,
                model : usersModel,

            }],
            where: {
                userId: req.params.userId,
            },
        });
        // promedio sacado desde el backend
        //const average = dataType.reduce((a, b) => a.qualification + b.qualification) / dataType.length;
        // const data = dataType.map((e, i) => (
        //     {
        //         userId: e.userId,
        //         qualification: parseInt(e.qualification),
        //         commentary: e.commentary,
        //     }
        // ));
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next();
    };
};

exports.addRateUser = async (req, res, next) => {
    try {
        await rateUserModel.create({
            userId: req.body.userId,
            qualification: req.body.qualification,
            commentary: req.body.commentary,
            qualifierId : req.body.qualifierId ,
        });
        res.status(200).json({ message: 'add it correctly' });
    } catch (error) {
        console.json(error);
        next();
    };
};
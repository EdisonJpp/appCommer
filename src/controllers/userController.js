const Users = require('../models/usersModel');
const publicationModel = require('../models/publicationModel');
const ProvinceModel = require('../models/provinceModel');

const { configJoinUser, includeJoinUser } = require('../config/joinConfig/index');
// const ProvinceModel = require('../models/provinceModel');
exports.getUsers = async (req, res, next) => {
    try {
        // configJoinUser();
        ProvinceModel.hasMany(Users, { foreignKey: 'province_id' });
        Users.belongsTo(ProvinceModel, { foreignKey: 'province_id' });
        Users.hasMany(publicationModel, { foreignKey: 'users_id' });
        publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
        const users = await Users.findAll({
            // attributes: '',
            // attributes: ['id', 'name', 'lastname', 'username', 'password', 'gender', 'emai', 'province_id'],
            include: [{ model: ProvinceModel }, { model: publicationModel }],
            // includeJoinUser
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next();
    };
};
exports.addUser = async (req, res, next) => {
    try {
        let { name, lastname, username, password, gender, phonenumber, emai, province_id } = new Users(req.body);
        //    await Users.findAll({
        //         where: {
        //             emai: emai
        //         }
        //     });
        // const validate = Users.emai ;
        // console.log(validate);
        // console.log(emai);
        // if(emai != validate ){
        await Users.create({
            name,
            lastname,
            username,
            password,
            gender,
            phonenumber,
            emai,
            province_id,
        });
        res.status(200).json({ message: 'add user correctly' });

        // }else ;



        // const correctly = ['add user correctly'];
        // res.json(correctly);


    } catch (error) {
        // res.json({ message: 'This email already exists' });
        error ? res.status(409).json({ error: 'This email already exists' }) : null;
        // console.log(error);

    }
};

/// my profile 
exports.getUserById = async (req, res, next) => {
    try {
        ProvinceModel.hasMany(Users, { foreignKey: 'province_id' });
        Users.belongsTo(ProvinceModel, { foreignKey: 'province_id' });
        Users.hasMany(publicationModel, { foreignKey: 'users_id' });
        publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
        const myProfile = await Users.findByPk(req.params.id, {
            include: [{ model: ProvinceModel }, { model: publicationModel }],
            // attributes: ['id', 'title', 'condition', 'price', 'description', 'image_name', 'wasPublishedAt', 'users_id', 'categoryId'],
            // order: [
            //     ['id', 'DESC']
            // ],
        });
        const data = {
            emai: myProfile.emai,
            gender: myProfile.gender,
            id: myProfile.id,
            lastname: myProfile.lastname,
            name: myProfile.name,
            password: myProfile.password,
            phonenumber: myProfile.phonenumber,
            province: myProfile.province,
            province_id: myProfile.province_id,
            publications: myProfile.publications.map(p => (
                {
                    categoryId: p.categoryId,
                    condition: p.condition,
                    description: p.description,
                    id: p.id,
                    image_name: p.image_name.split(','),
                    price: p.price,
                    title: p.title,
                    users_id: p.users_id,
                    wasPublishedAt: p.wasPublishedAt,
                }
            )),
            username:myProfile.username, 
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next();
    };
};
exports.updateUserById = async (req, res, next) => {
    const id = req.params.id;
    Users.update(req.body, {
        where: { id: id }
    }).then(e => res.status(200).json({ mensaje: "se actualizo correctamente el usuario" + '' + id }))
        .cacth(e => {
            console.log(e);
            next();
        });
};

// exports.updatePasswordById = async (req, res, next) => {
//     const id = req.params.id;
//     Users.findOrCreate(req.body, {
//         where: { id: id }
//     }).then(e => res.status(200).json({ mensaje: "se actualizo correctamente el usuario" + '' + id }))
//         .cacth(e => {
//             console.log(e);
//             next();
//         });
// };
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    Users.destroy({
        where: {
            id: id
        }
    }).then(e => res.json({ mensaje: "se elimino correctamente el usuario" + '' + id }))
        .cacth(e => {
            console.log(e);
            next();
        });
};
exports.authUser = async (req, res, next) => {
    // try {
    const { emai, password } = req.body;
    const user = await Users.findOne({
        where: {
            emai: emai,
            password: password
        },
    });
    if (user === null) {
        res.status(404).json({ error: 'datos incorrecto' });
    } else {
        user instanceof Users
        console.log(user instanceof Users)
        res.status(200).json({ user });
    };

    // } catch (error) {
    // res.status(404).json({ error : 'datos incorrectos'});


    // }
};



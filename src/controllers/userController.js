const Users = require('../models/usersModel');
const publicationModel = require('../models/publicationModel');
const ProvinceModel = require('../models/provinceModel');
const fs = require('fs');

const { configJoinUser, includeJoinUser } = require('../config/joinConfig/index');
exports.getUsers = async (req, res, next) => {
    try {
        ProvinceModel.hasMany(Users, { foreignKey: 'province_id' });
        Users.belongsTo(ProvinceModel, { foreignKey: 'province_id' });
        Users.hasMany(publicationModel, { foreignKey: 'users_id' });
        publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
        const users = await Users.findAll({
            include: [{ model: ProvinceModel }, { model: publicationModel }],
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next();
    };
};
exports.addUser = async (req, res, next) => {
    try {
        // const img = [] ; 
        // await req.body.profilePicture.map(i => {
        //     const ext = i.split('/')[1].split(';')[0];
        //     const image = i.split(',')[1];
        //     const image_name = Date.now() + '.' + ext;
        //     let image_path = './public/profile/' + image_name;
        //     img.push(image_name);
        //     const buildPicture = async () => {
        //         await fs.writeFileSync(image_path, image, 'base64');
        //     };
        //     buildPicture();

        //     next();
        // });

        // const profilePicture = img.join('');
        let { name, lastname, username, password, gender, phonenumber, emai, province_id  } = new Users(req.body);
        await Users.create({
            name,
            lastname,
            username,
            password,
            gender,
            phonenumber,
            emai,
            province_id,
            // profilePicture : profilePicture,
        });
        res.status(200).json({ message: 'added correctly' });
    } catch (error) {
        error ? res.status(409).json({ error: 'This email already exists' }) : null;
    };
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
            username: myProfile.username,
            // profilePicture : myProfile.profilePicture,
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
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;

    const {profilePicture} =  User.findByPk(id)  ;
    fs.unlink(path.resolve(`./public/profile/./${profilePicture}`), () => console.log('elimiando')); 
    Users.destroy({
        where: {
            id: id
        },
    }).then(e => res.json({ mensaje: "se elimino correctamente el usuario" + '' + id }))
        .cacth(e => {
            console.log(e);
            next();
        });


};
exports.authUser = async (req, res, next) => {
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
};



const publicationModel = require('../models/publicationModel');
const Users = require('../models/usersModel');
const categoryModel = require('../models/categoriesModel');
const shoppingCartModel = require('../models/carrito');

const fs = require('fs');
const { unlink } = require('fs-extra');
const path = require('path');
const { confingJoin, includeJoin } = require('../config/joinConfig');

exports.getPostByCategory = async (req, res, next) => {
    try {
        Users.hasMany(publicationModel, { foreignKey: 'users_id' });
        publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
        categoryModel.hasMany(publicationModel, { foreignKey: 'categoryId' });
        publicationModel.belongsTo(categoryModel, { foreignKey: 'categoryId' });
        const rawPublications = await publicationModel.findAll({
            include: [
                { model: Users, },
                { model: categoryModel, }
            ],
            where: {
                categoryId: req.params.categoryId,
            },
        });
        const publicationBycategory = rawPublications.map(p => (
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
                category: p.category,
                user: p.user,
                image_name: p.image_name.split(','),
            }
        ));
        res.status(200).json(publicationBycategory);
    } catch (error) {
        console.log(error);
        res.json([]);
        next();
    };
};

exports.getPublications = async (req, res, next) => {
    try {
        confingJoin();
        const rawPublication = await publicationModel.findAll(includeJoin);
        const publication = rawPublication.map(p =>
            ({
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
                categories: p.category,
                image_name: p.image_name.split(',')
            })
        );
        res.json(publication);
        console.log(publication);
    } catch (error) {
        res.json(error);
        console.log(error);
    };
};
exports.findById = async (req, res, next) => {
    try {
        confingJoin();
        const rawPublications = await publicationModel.findByPk(req.params.id, includeJoin);
        const publication = {
            id: rawPublications.id,
            title: rawPublications.title,
            condition: rawPublications.condition,
            price: rawPublications.price,
            description: rawPublications.description,
            image_name: rawPublications.image_name,
            wasPublishedAt: rawPublications.wasPublishedAt,
            users_id: rawPublications.users_id,
            categoryId: rawPublications.categoryId,
            categories: rawPublications.category,
            user: rawPublications.user,
            image_name: rawPublications.image_name.split(',')
        }
        res.json(publication);

    } catch (error) {

        next();
    }

};
exports.deletePublication = async (req, res, next) => {
    const { image_name } = await publicationModel.findByPk(req.params.id);
    const image = image_name.split(',');
    const id = req.params.id;
    await shoppingCartModel.destroy({
        where: {
            publicationId: id
        },
    }).then(e => console.log(e))
        .catch(e => {
            console.log(e)
            next();
        });
    await publicationModel.destroy({
        where: {
            id: id,
        },
    })
        .then(r => res.json({ message: "deleted publication" }))
        .catch(e => console.log(e));
    image.map(i => (
        unlink(path.resolve(`./public/uploads/./${i}`), () => console.log('elimiando'))
    ));
};
// 1590817046661
exports.AddPublication = async (req, res, next) => {
    try {
        const arrImg = [];
        await req.body.photos.map(i => {
            const ext = i.split('/')[1].split(';')[0];
            const image = i.split(',')[1];
            const image_name = Date.now() + '.' + ext;
            let image_path = './public/uploads/' + image_name;
            arrImg.push(image_name);
            const buildPicture = async () => {
                await fs.writeFileSync(image_path, image, 'base64');
            };
            buildPicture();
        });
        const images = arrImg.join(',');
        let { title, condition, price, description, wasPublishedAt, users_id, categoryId } = req.body.publicationData;
        await publicationModel.create({
            title, condition, price, description, image_name: images, wasPublishedAt, users_id, categoryId
        });
        res.status(200).json({ message: 'correctly' });
    } catch (error) {
        console.log(error);
        res.json(error);
        next();
    };
};

exports.myPublications = async (req, res, next) => {
    try {
        Users.hasMany(publicationModel, {
            foreignKey: 'users_id'
        });
        publicationModel.belongsTo(Users, { foreignKey: 'users_id' });
        const rawPublications = await publicationModel.findAll({
            include: {
                model: Users,
            },
            where: {
                users_id: req.params.users_id,
            },
        });
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
        if (!publication) {
            res.status(200).json([]);
        } else {
            res.status(200).json(publication);
        };
    } catch (error) {
        console.log(error);
        res.json({ message: 'service error' });
        next();
    };
};
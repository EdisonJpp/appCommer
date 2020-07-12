const shoppingCart = require('../models/carrito');
const PublicationModel = require('../models/publicationModel');
const User = require('../models/usersModel');

exports.getShoppingCart = async( req,res, next) => {
        try {
            PublicationModel.hasMany(shoppingCart, {foreignkey : 'publicationId'});
            shoppingCart.belongsTo(PublicationModel, {foreignkey : 'publicationId'});
            User.hasMany(shoppingCart , {foreignkey : 'userId'});
            shoppingCart.belongsTo(User, {foreignkey : 'userId'}); 
            const data = await shoppingCart.findAll({
                 include:[ {model :  PublicationModel}, {model : User} ],
             });
            res.json(data);
        } catch (error) {
            console.log(error);
            next()
        };
        
};
exports.addShoppingCart = async(req,res)=>{
    try {
        let { userId , publicationId } = req.body ; 
        shoppingCart.create({
            userId , publicationId ,
        });
        res.status(200).json({message : 'correctly'}); 
    } catch (error) {
        res.status(409).json({error : 'error'});
    };
};
exports.findCartById = async( req, res) =>{
    try {
        PublicationModel.hasMany(shoppingCart);
        shoppingCart.belongsTo(PublicationModel, {foreignkey : 'publicationId'});
        User.hasOne(shoppingCart);
        shoppingCart.belongsTo(User, {foreignkey : 'userId'}); 
        const data = await shoppingCart.findAll({
            where:{
                userId : req.params.userId,
            },
             include:[{ model  : User} , {model :  PublicationModel}],
         });
         res.status(200).json(data);
    } catch (error) {
        res.status(409).json([]);
    };
};
exports.deleteShoppingCart = async(req, res) =>{
    const id = req.params.id ; 
    shoppingCart.destroy({
        where:{
            id : id, 
        },
    });
    res.status(200).json({message : 'you delete it correctly'});
};
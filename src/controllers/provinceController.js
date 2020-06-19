const ProvinceModel = require('../models/provinceModel');

exports.getProvince =  async(req, res, next) =>{
    try {
        const province = await ProvinceModel.findAll();
        Console.log(province);
        res.json(province);
    } catch (error) {
        console.log(error);
    };
};
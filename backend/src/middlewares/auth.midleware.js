const foodPartnerModel = require("../models/food.partner.models")
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleWare(req, res, next){
    const token = req.cookies.token;
    if(!token){
       return res.status(401).json({
            message: "Please login first"
        })
    }

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const foodPartner = await foodPartnerModel.findById(decoded.id);
       req.foodPartner = foodPartner

       next()

    } catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })

    }
}

async function authUserMiddleWare(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findBYId(decoded.id);
        req.user = user
        next()
    }catch (err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleWare,
    authUserMiddleWare
}
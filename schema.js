const Joi=require("joi");
 module.exports.listingSchema=Joi.object({
    listings: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
    }).required()
 });

 //review schema validate
 module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
 });

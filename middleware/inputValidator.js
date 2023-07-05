const joi = require("joi");

module.exports = (schema, property) => (req, res, next) => {
    const result = schema.validate(req[property], { abortEarly: false});
    req[property] = result.value
    if(result.error){
        let message ;
        result.error.details.map(i => message+=i.message+"\n")
        res.status(400).json({
            success: false,
            message: message
        })
    }
    else{
        next()
    }
}
import { Request, Response, NextFunction } from 'express';
import _ = require('lodash');
import joi = require('joi')

const schema = joi.object().keys({
    entities: joi.array().items(
    joi.string()
).min(1).required(),
});

const schemasMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body)
        const valid = error == null
        if (valid) {
            next()
        } else {
            const errorsDetail = error?.details.map(i => i.message);
            res.status(400).json({
                status: false,
                error: errorsDetail
            })
        }
    }
}


export {schemasMiddleware}
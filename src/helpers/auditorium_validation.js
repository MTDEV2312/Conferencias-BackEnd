import {body,param} from 'express-validator'

const singleNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/;

const RegisterAuditoriumValidator = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
    body('nombre')
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .matches(singleNameRegex).withMessage("El nombre dolo se acepta letras y espacios")
        .isLength({min:5}).withMessage("Deben ser mas de 5 caracteres"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres"),
    body('ubicacion')
        .trim()
        .notEmpty().withMessage("La ubicacion es requerida")
        .isLength({min:10,max:150}).withMessage("Minimo de 10 caracteres maximo 150 caracteres"),
    body('capacidad')
        .trim()
        .notEmpty().withMessage("La capacidad es requerida")
        .isNumeric().withMessage("Solo se aceptan numeros")
]

const GetAuditoriumsByIdValidator = [
    param('codigo')
    .trim()
    .notEmpty().withMessage("El codigo es requerido")
]

const UpdateAuditoriumValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('nombre')
        .optional()
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .matches(singleNameRegex).withMessage("El nombre dolo se acepta letras y espacios")
        .isLength({min:5}).withMessage("Deben ser mas de 5 caracteres"),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres"),
    body('ubicacion')
        .optional()
        .trim()
        .notEmpty().withMessage("La ubicacion es requerida")
        .isLength({min:10,max:150}).withMessage("Minimo de 10 caracteres maximo 150 caracteres"),
    body('capacidad')
        .optional()
        .trim()
        .notEmpty().withMessage("La capacidad es requerida")
        .isNumeric().withMessage("Solo se aceptan numeros")
]

const DeleteAuditoriumValidation = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido')
]

export {
    RegisterAuditoriumValidator,
    GetAuditoriumsByIdValidator,
    UpdateAuditoriumValidator,
    DeleteAuditoriumValidation
}


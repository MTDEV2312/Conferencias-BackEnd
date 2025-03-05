import {body,param} from 'express-validator'

const RegisterBookingValidation = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('auditorio')
        .trim()
        .notEmpty().withMessage("El codigo del auditorio es requerido"),
    body('conferencistas')
        .trim()
        .notEmpty().withMessage('La cedula es requerida')
        .isLength({min:10}).withMessage('La cedula debe tener al menos 10 caracteres')
        .isNumeric().withMessage('La cedula debe ser un número')
        .custom((value)=>{
            if(!isCedula(value)){
                throw new Error('Cédula ecuatoriana inválida')
            }
            return true
        })
]

const GetBookingByIdValidation = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
]

const UpdateBookingValidation = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('auditorio')
        .optional()
        .trim()
        .notEmpty().withMessage("El codigo del auditorio es requerido")
]

const DeleteBookingValidation = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido')
]

export {
    RegisterBookingValidation,
    GetBookingByIdValidation,
    UpdateBookingValidation,
    DeleteBookingValidation
}
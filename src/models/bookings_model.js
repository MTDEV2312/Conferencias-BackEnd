import {Schema, model} from 'mongoose'

const bookingSchema = new Schema({
    codigo:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    auditorio:{
        type:String,
        ref:'Auditoriums',
        trim:true,
        required:true
    },
    conferencistas:{
        type:String,
        ref:'Speakers',
        trim:true,
        required:true
    }
},{timestamps:true})

export default model('bookings',bookingSchema)
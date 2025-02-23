import {Schema, model} from 'mongoose'

const auditoriumSchema = new Schema({
    codigo:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    ubicacion:{
        type:String,
        trim:true,
        required:true
    },
    capacidad:{
        type:Number,
        trim:true,
        required:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
})

export default model("Auditoriums",auditoriumSchema)

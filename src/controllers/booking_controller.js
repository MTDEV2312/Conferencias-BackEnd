import Booking from '../models/bookings_model.js'
import Auditoriums from '../models/auditoriums_model.js'
import Speakers from '../models/speakers_model.js'


const RegisterBooking = async(req,res) => {
    try {
        const {codigo} = req.body
    
        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        const bookingBDD = await Booking.findOne({codigo:codigo})
        if(bookingBDD){return res.status(400).json({msg:"El codigo ya se encuentra registrado"})}
        
        const newBooking = new Booking(req.body)
        await newBooking.save()
        return res.status(201).json({msg:"Auditorio registrado Correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json("Lo sentimos, algo salio mal")
    }
}

const GetBookings = async(req,res) => {
    try {
        const BookingBDD = await Booking.find()
        const auditoriumCode = [... new Set(BookingBDD.map(booking => booking.auditorio))]
        const speakerId = [... new Set(BookingBDD.map(booking => booking.conferencistas))]

        const auditoriumBDD = await Auditoriums.find({codigo:{$in:auditoriumCode}})
        const speakerBDD = await Speakers.find({cedula:{$in:speakerId}})

        const auditoriumMap = auditoriumBDD.reduce((map,auditorium)=>{
            map[auditorium.codigo]={
                _id: auditorium.id,
                codigo: auditorium.codigo,
                nombre: auditorium.nombre,
                ubicacion: auditorium.ubicacion,
                capacidad: auditorium.capacidad,
                descripcion:auditorium.descripcion
            }
            return map
        },{})

        const speakerMap = speakerBDD.reduce((map,speaker)=>{
            map[speaker.cedula]={
                _id: speaker.id,
                cedula: speaker.cedula,
                nombre: speaker.nombre,
                apellido: speaker.apellido,
                email: speaker.email,
                telefono: speaker.telefono,
                empresa: speaker.empresa,
                genero: speaker.genero,
                ciudad: speaker.ciudad,
                direccion: speaker.direccion,
                fecha_nacimiento: speaker.fecha_nacimiento
            }
            return map
        },{})
    
        const response = BookingBDD.map(booking => ({
            _id: booking.id,
            codigo: booking.codigo,
            descripcion:booking.descripcion,
            auditorio: auditoriumMap[booking.auditorio] || null,
            conferencistas: speakerMap[booking.conferencistas] || null
        }))
    
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Lo sentimos, algo salio mal'})
    }
}

const GetBookingsById = async(req,res) => {
    try {
        const {codigo}=req.params

        if(!codigo){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un codigo"})
        }

        const BookingBDD = await Booking.findOne({codigo:codigo})

        if(!BookingBDD){
            return res.status(400).json({msg: "Lo sentimos, la reserva no existe"})
        }

        const AuditoriumID = BookingBDD.auditorio
        const SpeakerID = BookingBDD.conferencistas
        const SpeakerBDD = await Speakers.findOne({cedula:SpeakerID})
        const AuditoriumBDD = await Auditoriums.findOne({codigo:AuditoriumID})

        const speakerDetails = SpeakerBDD ?{
            _id: SpeakerBDD.id,
            cedula: SpeakerBDD.cedula,
            nombre: SpeakerBDD.nombre,
            apellido: SpeakerBDD.apellido,
            email: SpeakerBDD.email,
            telefono: SpeakerBDD.telefono,
            empresa: SpeakerBDD.empresa,
            genero: SpeakerBDD.genero,
            ciudad: SpeakerBDD.ciudad,
            direccion: SpeakerBDD.direccion,
            fecha_nacimiento: SpeakerBDD.fecha_nacimiento
        }:null

        const AuditoriumDetails = AuditoriumBDD ?{
            _id: AuditoriumBDD.id,
            codigo: AuditoriumBDD.codigo,
            nombre: AuditoriumBDD.nombre,
            ubicacion: AuditoriumBDD.ubicacion,
            capacidad: AuditoriumBDD.capacidad,
            descripcion:AuditoriumBDD.descripcion
        }:null

        const BookingDetail = {
            _id: BookingBDD.id,
            codigo: BookingBDD.codigo,
            descripcion:BookingBDD.descripcion,
            auditorio: AuditoriumDetails,
            conferencistas: speakerDetails
        }
        return res.status(200).json(BookingDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const UpdateBookings = async (req,res) => {
    try {
        const {id} = req.params
        const updates = req.body
    
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
    
        const validFields = ['descripcion','auditorio']
        const filteredFields = {}
    
        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
    
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }
    
        await Booking.findByIdAndUpdate(id,filteredFields,{new:true})
    
        const response = await Booking.findById(id).lean().select("-__v")
        res.status(200).json({msg:"Reserva actualizada",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const DeleteBooking = async (req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Citas"})
    }

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id)
        if(!deletedBooking){
            return res.status(400).json({msg: "Reserva no registrada"})
        }
        return res.status(200).json({msg: "Reserva eliminada exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}


export {
    RegisterBooking,
    GetBookings,
    GetBookingsById,
    UpdateBookings,
    DeleteBooking
}


import Speakers from '../models/speakers_model.js'

const RegisterSpeaker = async (req,res) => {
    try {
        const {email,cedula} = req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
    
        const speakerBDD = await Speakers.findOne({email:email})
        if(speakerBDD){return res.status(400).json({msg:"El email ya se encuentra registrado"})}
    
        const cedulaBDD = await Speakers.findOne({cedula:cedula})
        if(cedulaBDD){return res.status(400).json({msg:"La cedula ya se encuentra registrada"})}
    
        const newSpeaker = new Speakers(req.body)
        await newSpeaker.save()
        return res.status(201).json({msg:"Conferencista registrado Correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json("Algo salio mal")
    }
}

const GetSpeakers = async(req,res) => {
    try {
        const SpeakersBDD = await Speakers.find()

        const response = SpeakersBDD.map(speaker => ({
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
        }))

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Algo salio mal'})
    }
}

const GetSpeakerById = async (req,res) => {
    try {
        const {cedula} =req.params

        if(!cedula){return res.status(400).json({msg:"Lo sentimos, debes proporcionar una cedula"})}

        const speakerBDD = await Speakers.findOne({cedula:cedula})
        if(!speakerBDD){return res.status(400).json({msg:"El conferencista no existe"})}

        const response = {
            _id: speakerBDD.id,
            cedula: speakerBDD.cedula,
            nombre: speakerBDD.nombre,
            apellido: speakerBDD.apellido,
            email: speakerBDD.email,
            telefono: speakerBDD.telefono,
            empresa: speakerBDD.empresa,
            genero: speakerBDD.genero,
            ciudad: speakerBDD.ciudad,
            direccion: speakerBDD.direccion,
            fecha_nacimiento: speakerBDD.fecha_nacimiento
        }
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const UpdateSpeaker = async (req,res) => {
    try {
        const {id}=req.params
        const updates= req.body

        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Pacientes"})
        }
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre','apellido','email','fecha_nacimiento','genero','direccion','telefono','ciudad','empresa']
        const filteredFields={}

        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
        
            // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Speakers.findByIdAndUpdate(id,filteredFields,{new:true})

        const response = await Speakers.findById(id).lean().select("-__v")

        return res.status(200).json({msg: "Conferencista actualizado exitosamente",response})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const DeleteSpeaker = async (req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Auditorios"})
    }

    try {
        const deletedSpeaker = await Speakers.findByIdAndDelete(id)
        if(!deletedSpeaker){
            return res.status(400).json({msg: "El Conferencista no existe"})
        }
        return res.status(200).json({msg: "Conferencista eliminado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export {
    RegisterSpeaker,
    GetSpeakers,
    GetSpeakerById,
    UpdateSpeaker,
    DeleteSpeaker
}


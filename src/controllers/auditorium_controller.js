import Auditoriums from '../models/auditoriums_model.js'

const RegisterAuditorium = async (req,res) => {
        try {
            const {codigo} = req.body
    
            //? Verifica si un campo esta vacio
            if(Object.values(req.body).includes("")) {
                return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
            }
        
            const auditoriumBDD = await Auditoriums.findOne({codigo:codigo})
            if(auditoriumBDD){return res.status(400).json({msg:"El codigo ya se encuentra registrado"})}
        
            const newAuditorium = new Auditoriums(req.body)
            await newAuditorium.save()
            return res.status(201).json({msg:"Auditorio registrado Correctamente"})
        } catch (error) {
            console.log(error)
            return res.status(500).json("Lo sentimos, algo salio mal")
        }
}

const GetAuditoriums = async(req,res) => {
        try {
            const AuditoriumsBDD = await Auditoriums.find()
    
            const response = AuditoriumsBDD.map(auditorium => ({
                _id: auditorium.id,
                codigo: auditorium.codigo,
                nombre: auditorium.nombre,
                ubicacion: auditorium.ubicacion,
                capacidad: auditorium.capacidad,
                descripcion:auditorium.descripcion
            }))
    
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:'Lo sentimos, algo salio mal'})
        }
}

const GetAuditoriumsById = async (req,res) => {
        try {
            const {codigo} =req.params
    
            if(!codigo){return res.status(400).json({msg:"Lo sentimos, debes proporcionar un codigo"})}
    
            const auditoriumBDD = await Auditoriums.findOne({codigo:codigo})
            if(!auditoriumBDD){return res.status(400).json({msg:"El auditorio no existe"})}
    
            const response = {
                _id: auditoriumBDD.id,
                codigo: auditoriumBDD.codigo,
                nombre: auditoriumBDD.nombre,
                ubicacion: auditoriumBDD.ubicacion,
                capacidad: auditoriumBDD.capacidad,
                descripcion:auditoriumBDD.descripcion
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
        }
}

const UpdateAuditorium = async (req,res) => {
        try {
            const {id}=req.params
            const updates= req.body
    
            if(!id){
                return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Pacientes"})
            }
            // Obtener los datos del tecnico a actualizar
            const validFields = ['nombre','direccion','ubicacion','capacidad','descripcion']
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
    
            await Auditoriums.findByIdAndUpdate(id,filteredFields,{new:true})
    
            const response = await Auditoriums.findById(id).lean().select("-__v")
    
            return res.status(200).json({msg: "Auditorio actualizado exitosamente",response})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
        }
}

const DeleteAuditorium = async (req,res) => {
        const {id} = req.params
        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Auditorios"})
        }
    
        try {
            const deletedAuditorium = await Auditoriums.findByIdAndDelete(id)
            if(!deletedAuditorium){
                return res.status(400).json({msg: "El Auditorio no existe"})
            }
            return res.status(200).json({msg: "Auditorio eliminado exitosamente"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
        }
}

export{
    RegisterAuditorium,
    GetAuditoriums,
    GetAuditoriumsById,
    UpdateAuditorium,
    DeleteAuditorium
}



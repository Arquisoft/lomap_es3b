const { Schema, model } = require('mongoose')

// Esquema para la base de datos y el json
const PlaceSchema = Schema(
    { 
        name: { 
            type: String, 
            required: true 
        }, 
        direction: { 
            type: String, 
            required: true 
        },
        latitude: { 
            type: Number, 
            required: true
        } ,
        longitude: { 
            type: Number, 
            required: true
        } ,
        comments: { // Los comentarios igual conviene sacarlos de otro apartado de la base de datos
            type: String, 
            required: true 
        },
        photoLink: [{ // Las fotos igual se podria hacer como con los comentarios
            photo1: String, 
            photo2: String, 
            photo3: String  
        }]
    }, 
    
    { 
        timestamps: true 
    }
)

// Esquema temporal para ver como seria el de los pods
const PodSchema = Schema(
    { 
        id: { 
            type: String, 
            required: true 
        }, 
        ratings: [{ // temporal para pruebas
            rating1: String, 
            rating2: String, 
            rating3: String  
        }]
    }, 
    
    { 
        timestamps: true 
    }
)
    
PlaceSchema.methods.toJSON = function () {
    const { __v, _id, ...place } = this.toObject()
    place.uid = _id
    return place 
}

module.exports = model('Place', PlaceSchema)
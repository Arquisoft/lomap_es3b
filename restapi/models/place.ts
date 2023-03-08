const { Schema, model } = require('mongoose')

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
        coord: { 
            type: Number, 
            required: true 
        }  
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
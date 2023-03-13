const mongoose = require('mongoose')

const { MONGODB, MONGODB_ATLAS_TEST, NODE_ENV } = process.env // saca del .env la ruta a la base de datos

//const connectionString = NODE_ENV === 'test' ? MONGODB_ATLAS_TEST : MONGODB_ATLAS

const connectionString = MONGODB // el enlace a la base de datos

if (!connectionString) {
    console.error('Yoy must define your connection string')
}

// Realiza la conexion con la base de datos
const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(connectionString), { // se conecta con el mongoose
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        // en caso de conectar correctamente con la base de datos
        console.log('Database online succesfully')
    } catch (err) {
        console.log(err)
        throw new Error('Cannot connect to the database ')
    }

    process.on('uncaughtException', error => {
        console.error(error)
        mongoose.disconnect()
    })
}
module.exports = { dbConnection }
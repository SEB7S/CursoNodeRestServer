const mongoose = require('mongoose')


const dbConection = async (db) => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Bases de datos ok')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}



module.exports = {
    dbConection
}
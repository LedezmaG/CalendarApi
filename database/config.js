const mongoose = require('mongoose')

const bdConnection = async () => {

    try {
        
        await mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('BD online');

    } catch (error) {
        console.log( error );
        throw new Error('Error a la hora de inicializar BD')
    }

}


module.exports = {
    bdConnection
}
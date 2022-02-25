const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await mongoose.connect(db,{
            useNewUrlParser: true,
<<<<<<< HEAD
            useUnifiedTopology: true,
            useCreateIndex: true,
=======
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
>>>>>>> f35fee0d53258c8704fc2cee0aaec76b498cb259
        }
            );
       console.log('MongoDB Connected...we are on? I think we are..')

    }catch(err){
        console.log(err);
        // Exit process with failure
        process.exit(1);
    };
};


module.exports = connectDB;
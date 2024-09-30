import mongoose from 'mongoose';

const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://sulabhsamrat:Piyu%401134@cluster0.cf8exr2.mongodb.net/krishihart', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};

export default connection;



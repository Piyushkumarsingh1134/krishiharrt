import mongoose from 'mongoose';

const { Schema, model } = mongoose;  // Extracting Schema and model from mongoose


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    tags: {
        type: String,  // Corrected `Type` to `type`
    },
    description: {
        type: String,
    },
    price:{
        type:Number,
    }
});


const File = model("File", fileSchema);  // Capitalized model name for consistency
export default File;


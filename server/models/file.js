import mongoose from 'mongoose';


const { Schema, model } = mongoose;  


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
        type: String,  
    },
    description: {
        type: String,
    },
    price:{
        type:Number,
    },
    Sellerid:{
        type:mongoose.Schema.ObjectId,
        ref:"Seller",
        require:"true",

    }

});


const File = model("File", fileSchema);  // Capitalized model name for consistency
export default File;


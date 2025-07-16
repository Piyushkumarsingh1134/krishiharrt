import { response } from 'express';
import File from '../models/file.js';
import { v2 as cloudinary } from 'cloudinary';  


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);  
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;  
    } catch (error) {
        throw new Error("Failed to upload to Cloudinary");  
    }
}

const imageupload = async (req, res) => {
    try {
        
        const { name, tags, description, price} = req.body;
        console.log(name, tags, description,price);
        const sellerId = req.sellerId;

        console.log('yaha error a rahi hai');
        const file = req.files.imagefile;
        console.log(file);

     
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();  
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ message: "File type not supported" });
        }

    
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

const filedata = await File.create({
    name,
    tags,
    description,
    price,
    imageurl: response.secure_url,
    Sellerid: sellerId

});

        res.json({
            success: true,
            message: "Image uploaded successfully",
            cloudinaryUrl: response.secure_url 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
};

const getproductbyid = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const product = await File.findById(id);
        console.log("in product");
        
        
        
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};




const getProducts = async (req, res) => {
    try {
      
        const products = await File.find();  

       
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

const getproductbytags = async (req, res) => {
    try {
        const type = req.query.tags;       
        console.log(type);
        const products = await File.find({ tags: type });
        if (!products) {
            res.status(404).json({ msg: "not found" })
        }
        res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
    }
}






export { imageupload,getProducts ,getproductbyid,getproductbytags};






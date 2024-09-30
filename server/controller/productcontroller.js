import { response } from 'express';
import File from '../models/file.js';
import { v2 as cloudinary } from 'cloudinary';  // ES6 import for cloudinary


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);  // Check if the file type is supported
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;  // Return the response from Cloudinary
    } catch (error) {
        throw new Error("Failed to upload to Cloudinary");  // Throw an error if upload fails
    }
}

const imageupload = async (req, res) => {
    try {
        const { name, tags, description, price} = req.body;
        console.log(name, tags, description,price);


        console.log('yaha error a rahi hai');
        const file = req.files.imagefile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();  // Get the file extension
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ message: "File type not supported" });
        }

        // Uploading to Cloudinary
        console.log("uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);
// db me entry create karni hai bhii
const filedata = await File.create({
    name,
    tags,
    description,
    price,
    imageurl: response.secure_url,
});

        // Success response
        res.json({
            success: true,
            message: "Image uploaded successfully",
            cloudinaryUrl: response.secure_url  // Include Cloudinary URL in response
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
         // Get product ID from request parameters
        const product = await File.findById(id);
        console.log("in product");
        
        console.log(product);
         // Fetch product from the database using the ID
        
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        // Respond with a single product object, not an array
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
        // Fetch all products from the database
        const products = await File.find();  // Assuming 'File' is the model for the products

        // If no products are found
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        // Success response with the list of products
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





// Export the functions as named exports
export { imageupload,getProducts ,getproductbyid,getproductbytags};






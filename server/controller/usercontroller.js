import User from '../models/User-schema.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret_key'; 

export const userLogIn = async (request, response) => {
    try {
        console.log(request.body.username);
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        console.log(user);
        
        if (user) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                JWT_SECRET,
                { expiresIn: '7d' }
            );
            
            return response.status(200).json({
                message: `${request.body.username} login successful`,
                token: token,
                username: user.username
            });
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.status(500).json('Error: ' + error.message);
    }
};

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ mesage: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            const decodedData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decodedData?._id;
        }

        next();
    } catch (error) {}
};

export default auth;

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;

const verifyJWTokenMiddleware = async (req, res, next) => {
  const token = req.cookies?._auth_token_recopick;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Please log in to access this resource.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWTSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: 'Invalid token. Please log in again.' });
  }
};

export default verifyJWTokenMiddleware;

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;

// Login and generate JWT token, send token to client as HttpOnly cookie
export const login = async (req, res) => {
  const { email } = req.body;

  // JWT Token
  const token = jwt.sign({ email }, JWTSecret, { expiresIn: '5h' });

  // HttpOnly cookie send to client
  res
    .cookie('_auth_token_recopick', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .status(200)
    .send({ success: true });
};

// Logout and clear JWT token
export const logout = async (req, res) => {
  res
    .clearCookie('_auth_token_recopick', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .status(200)
    .send({ success: true });
};

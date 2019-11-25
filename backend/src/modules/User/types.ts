import {Request} from 'express';
import {Document} from 'mongoose';

export interface User {
  token: string;
  jwtToken: string;
  name: string;
  email: string;
  password: string;
}

// @xxx API
export interface UserRequest extends Request {
  user: User;
}

// @xxx Mongoose
export interface IUser extends Document, User {
  createdAt: Date;
  updatedAt: Date;
}

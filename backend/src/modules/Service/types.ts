import { Document } from 'mongoose';

export interface Service {
  name: string;
  icon: string;
  needAuth: boolean;
  token: string;
  widgets: { name: string; description: string }[];
}

// @xxx Mongoose
export interface IService extends Document, Service {
  createdAt: Date;
  updatedAt: Date;
}

import { Document } from 'mongoose';

import { User } from 'modules/User/types';
import { Service } from 'modules/Service/types';

export interface Widget {
  name: string;
  description: string;
  params: { [key: string]: object };
  user: User;
  service: Service;
}

// @xxx Mongoose
export interface IWidget extends Document, Widget {
  createdAt: Date;
  updatedAt: Date;
}

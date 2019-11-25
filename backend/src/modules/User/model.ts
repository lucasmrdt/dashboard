import {model, Schema} from 'mongoose';
import {isEmail} from 'validator';

import {User, IUser} from 'modules/User/types';

export const UserSchema = new Schema<User>(
  {
    token: {
      type: String,
      unique: true,
    },
    jwtToken: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: isEmail,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({UIMId: 1});

export const USER_MODEL_NAME = 'User';
export const UserModel = model<IUser>(USER_MODEL_NAME, UserSchema);

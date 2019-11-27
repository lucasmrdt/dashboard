import { model, Schema } from 'mongoose';

import { Service, IService } from 'modules/Service/types';

export const ServiceSchema = new Schema<Service>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    icon: {
      type: String,
      default: 'project'
    },
    needAuth: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ''
    },
    widgets: [
      {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        defaultParams: { type: Object, default: {} }
      }
    ]
  },
  {
    timestamps: true
  }
);

ServiceSchema.index({ name: 1 });

export const SERVICE_MODEL_NAME = 'Service';
export const ServiceModel = model<IService>(SERVICE_MODEL_NAME, ServiceSchema);

import { model, Schema } from 'mongoose';
import { DEFAULT_REFRESH_INTERVAL } from './constants';
import { SERVICE_MODEL_NAME } from 'modules/Service/model';
import { USER_MODEL_NAME } from 'modules/User/model';

import { Widget, IWidget } from 'modules/Widget/types';

export const WidgetSchema = new Schema<Widget>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: { refreshInterval: DEFAULT_REFRESH_INTERVAL }
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: SERVICE_MODEL_NAME
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME
    }
  },
  {
    timestamps: true
  }
);

WidgetSchema.index({ name: 1 });

export const WIDGET_MODEL_NAME = 'Widget';
export const WidgetModel = model<IWidget>(WIDGET_MODEL_NAME, WidgetSchema);

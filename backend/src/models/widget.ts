import mongoose from 'mongoose';

const widgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
 location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  createdAt: { type: Date, default: Date.now }
});
widgetSchema.index({ location: '2dsphere' });
export const Widgets = mongoose.model('Widgets', widgetSchema);

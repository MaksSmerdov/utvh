import mongoose from 'mongoose';

const hvoDataSchema = new mongoose.Schema({
  temperatures: Object,
  pressures: Object,
  flows: Object,
  levels: Object,
  frequency: Object,
  others: Object,
  lastUpdated: Date,
});

const Hvo2Model = mongoose.model('hvo2Models', hvoDataSchema);

hvoDataSchema.index({ lastUpdated: 1 });

export { Hvo2Model };
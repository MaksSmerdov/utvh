import mongoose from 'mongoose';

const hvoDataSchema = new mongoose.Schema({
  pressures: Object,
  flows: Object,
  levels: Object,
  frequency: Object,
  task: Object,
  others: Object,
  lastUpdated: Date,
});

const Hvo1Model = mongoose.model('hvo1Models', hvoDataSchema);

hvoDataSchema.index({ lastUpdated: 1 });

export { Hvo1Model };
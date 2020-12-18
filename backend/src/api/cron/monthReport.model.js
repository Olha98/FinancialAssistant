const mongoose = require('mongoose');
const { Schema ,  Types: { ObjectId },} = mongoose;

const monthReportSchema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  totalExpenses: { type: Number, default: 0, required: true },
  totalSavings: { type: Number, default: 0, required: true },
  totalIncome: { type: Number, default: 0, required: true },
  expectedSavingsPercentage: { type: Number, default: 0, required: true },
  expectedSavings: { type: Number, default: 0, required: true },
  reportDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('MonthReport', monthReportSchema);

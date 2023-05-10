import mongoose from 'mongoose';

const pageSpeedReportSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    cumulativeLayoutShiftScore: {
      type: Number,
    },
    experimentalInteractionToNextPaint: {
      type: Number,
    },
    experimentalTimeToFirstByte: {
      type: Number,
    },
    firstContentfulPaintMs: {
      type: Number,
    },
    firstInputDelayMs: {
      type: Number,
    },
    largestContentfulPaintMs: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const PageSpeedReport = mongoose.model(
  'PageSpeedReport',
  pageSpeedReportSchema
);

export default PageSpeedReport;

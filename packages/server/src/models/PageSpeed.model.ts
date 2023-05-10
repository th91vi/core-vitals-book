import mongoose from 'mongoose';

const pageSpeedReportSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    startegy: {
      type: String,
    },
    cumulativeLayoutShiftScore: {
      type: Object,
    },
    experimentalInteractionToNextPaint: {
      type: Object,
    },
    experimentalTimeToFirstByte: {
      type: Object,
    },
    firstContentfulPaintMs: {
      type: Object,
    },
    firstInputDelayMs: {
      type: Object,
    },
    largestContentfulPaintMs: {
      type: Object,
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

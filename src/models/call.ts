import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Calling",
        "Accepted",
        "Declined",
        "Retry",
        "Failed",
      ],
      default: "Pending",
    },

    attempts: {
      type: Number,
      default: 0,
    },

    response: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Call", callSchema);
import mongoose from "mongoose";

const meetupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    meetingPlace: {
      type: String,
      required: true,
    },

    meetingAt: {
      type: Date,
      required: true,
    },

    selectedContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],

    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Completed", "Cancelled"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const Meetup = mongoose.model("Meetup", meetupSchema);

export default Meetup;
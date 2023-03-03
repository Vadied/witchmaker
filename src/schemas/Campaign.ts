import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const Schema = mongoose.Schema;

const campaignSchema = new Schema(
  {
    name: { type: String, required: true },
    closedAt: { type: Date, default: null },
    master: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
    characters: [
      { type: Schema.Types.ObjectId, ref: "Character", autopopulate: true },
    ],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

campaignSchema.plugin(autopopulate);

const Campaign =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
export default Campaign;

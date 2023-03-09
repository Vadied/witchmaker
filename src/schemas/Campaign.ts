import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    closedAt: { type: Date, default: null },
    master: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    // characters: [
    //   { type: Schema.Types.ObjectId, ref: "Character", autopopulate: true },
    // ],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

schema.plugin(autopopulate);

const Campaign =  mongoose.models?.Campaign || mongoose.model("Campaign", schema);
export default Campaign;

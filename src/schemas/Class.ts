import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: Date, default: null },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const Class =
  mongoose.models.Class || mongoose.model("Class", classSchema);
export default Class;

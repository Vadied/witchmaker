import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  class: { type: Schema.Types.ObjectId, ref: "Class", autopopulate: true },
  campaign: { type: Schema.Types.ObjectId, ref: "Campaign", autopopulate: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
},
{
  timestamps: true,
  usePushEach: true,
});

characterSchema.plugin(autopopulate);

const Character = mongoose.models.Character || mongoose.model("Character", characterSchema);
export default Character;

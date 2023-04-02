import mongoose from "mongoose";
const Schema = mongoose.Schema;

/* mongodb generate id for each record   but 
if you want generate your id for each person 
uncomment the code below */

var PersonModelSchema = new Schema({
  personId: {
    type: mongoose.Types.ObjectId,
    default: () => new ObjectId(),
    unique: true,
    index: true,
    required: true,
    auto: true,
  },
  name: { type: String },
  family: { type: String },
});

const personSchema = mongoose.model("personSchema", PersonModelSchema);

export default personSchema;

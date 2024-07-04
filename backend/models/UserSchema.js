import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },

  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);

/* Type: This field is an array ([]). It's designed to store multiple values.
Individual Element Type: Each element within the array is of the type mongoose.Types.ObjectId. This is a special data type that Mongoose uses to represent unique identifiers in MongoDB.
Reference (ref): The ref: "Appointment" part is crucial. It establishes a relationship between your User model and another model called Appointment. This means each ObjectId stored in the appointments array is expected to be a valid ID of a document in the Appointment collection.*/

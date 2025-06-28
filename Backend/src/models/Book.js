import mongoose from "mongoose";
import User from "./User.js"; // .js na dile import error dibe sometimes

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ref er value hobe model er naam (string)
    required: true
  }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;

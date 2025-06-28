import express from "express";
const router = express.Router();

import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";
import User from "../models/User.js";

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id, // jodi authentication thake
    });

    await newBook.save();

    res.status(201).json({ book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page
    });
  } catch (err) {
    console.error("Error in get all books:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Sorry, we didn't find your book" });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User is unauthorized" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error detected on delete book:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

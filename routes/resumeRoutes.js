// src/routes/resumeRoutes.js
const express = require("express");
const {
  uploadResume,
  getAllResumes,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, uploadResume);   // Upload a resume
router.get("/", authMiddleware, getUserResumes);  // Get all resumes for a user
router.get("/all", getAllResumes);                // Admin: Get all resumes
router.get("/:id", authMiddleware, getResumeById);// Get a specific resume
router.put("/:id", authMiddleware, updateResume); // Update a resume
router.delete("/:id", authMiddleware, deleteResume); // Delete a resume

module.exports = router;

// src/controllers/resumeController.js
const Resume = require("../models/Resume");
const { processResumeWithAI } = require("../services/resumeProcessor");

// ✅ Create & Process Resume (POST)
const uploadResume = async (req, res) => {
  try {
    const { name, email, phone, fileUrl } = req.body;
    const userId = req.user.id;

    const skills = await processResumeWithAI(fileUrl); // AI-powered skill extraction

    const resume = new Resume({
      user: userId,
      name,
      email,
      phone,
      skills,
      fileUrl,
      status: "Processed",
    });

    await resume.save();
    res.status(201).json({ message: "Resume uploaded successfully", resume });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get All Resumes (GET)
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Resumes by User (GET)
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Resume by ID (GET)
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update Resume (PUT)
const updateResume = async (req, res) => {
  try {
    const { name, email, phone, fileUrl } = req.body;
    const resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    resume.name = name || resume.name;
    resume.email = email || resume.email;
    resume.phone = phone || resume.phone;
    resume.fileUrl = fileUrl || resume.fileUrl;

    await resume.save();
    res.json({ message: "Resume updated successfully", resume });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete Resume (DELETE)
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await resume.deleteOne();
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  uploadResume,
  getAllResumes,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};

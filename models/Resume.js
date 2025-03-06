// src/models/Resume.js
const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    skills: [{ type: String }],
    experience: [{ company: String, role: String, duration: String }],
    education: [{ institution: String, degree: String, year: String }],
    fileUrl: { type: String, required: true }, // Cloud storage link (e.g., S3, Cloudinary)
    status: { type: String, enum: ["Pending", "Processed"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);
module.exports = Resume;

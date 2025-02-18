import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    jdUrl: { type: String, required: true }, // Cloudinary URL of JD PDF
    jdText: { type: String, required: true }, // Extracted text from JD PDF
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);

export default Job;

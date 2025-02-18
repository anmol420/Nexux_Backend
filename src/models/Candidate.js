import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    salary: { type: Number },
    pdfUrl: { type: String }, 
    pdfText: { type: String }, 
});

CandidateSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

CandidateSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;

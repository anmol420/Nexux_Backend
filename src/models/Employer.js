import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const EmployerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }] // Stores all jobs posted
});

// Hash password before saving
EmployerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password comparison
EmployerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Employer = mongoose.model("Employer", EmployerSchema);

export default Employer;

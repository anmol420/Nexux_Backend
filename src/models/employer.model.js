import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
        type: String, 
        required: true,
    },
    role: {
        type: String,
        default: "EMPLOYER",
    },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        }
    ],
}, {
    timestamps: true,
});

employerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

employerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
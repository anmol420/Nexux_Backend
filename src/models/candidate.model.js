import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const candidateSchema = new mongoose.Schema({
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
    firstTimeLogin: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "CANDIDATE",
    },
    location: { 
        type: String,
    },
    salary: { 
        type: String,
    },
    githubUrl: {
        type: String,
    },
    pdfUrl: { 
        type: String,
    }, 
    pdfText: {
        type: String,
    },
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CandidateRank",
        },
    ]
}, {
    timestamps: true,
});

candidateSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

candidateSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
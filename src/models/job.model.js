import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    employerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Employer",
    },
    jobCompany: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jdUrl: { 
        type: String, 
        required: true,
    },
    jdText: {
        type: String, 
        required: true,
    },
    rank: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rank",
        }
    ]
}, { 
    timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
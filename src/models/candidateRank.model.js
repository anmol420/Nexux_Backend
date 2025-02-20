import mongoose from "mongoose";

const candidateRankSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    jobCompany: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    rank: {
        type: Number,
    },
    selectionStatus: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const CandidateRank = mongoose.model("CandidateRank", candidateRankSchema);

export default CandidateRank;
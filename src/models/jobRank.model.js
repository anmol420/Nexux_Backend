import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;
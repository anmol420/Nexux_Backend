import Candidate from "../models/Candidate.js";
import generateToken from "../utils/generateToken.js";

export const registerCandidate = async (req, res) => {
    const { name, email, password, location, salary } = req.body;

    try {
        const userExists = await Candidate.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Candidate already exists" });

        const candidate = await Candidate.create({
            name,
            email,
            password,
            location,
            salary,
            pdfUrl: req.file ? req.file.path : "",
            pdfText: req.file ? "Sample Extracted Text" : "", 
        });

        if (candidate) {
            res.status(201).json({
                _id: candidate.id,
                name: candidate.name,
                email: candidate.email,
                location: candidate.location,
                salary: candidate.salary,
                token: generateToken(candidate.id),
            });
        } else {
            res.status(400).json({ message: "Invalid candidate data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const loginCandidate = async (req, res) => {
    const { email, password } = req.body;

    try {
        const candidate = await Candidate.findOne({ email });

        if (candidate && (await candidate.matchPassword(password))) {
            res.json({
                _id: candidate.id,
                name: candidate.name,
                email: candidate.email,
                location: candidate.location,
                salary: candidate.salary,
                token: generateToken(candidate.id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

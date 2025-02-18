import Employer from "../models/Employer.js";
import generateToken from "../utils/generateToken.js";

export const registerEmployer = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const employerExists = await Employer.findOne({ email });
        if (employerExists) return res.status(400).json({ message: "Employer already exists" });

        const employer = await Employer.create({ name, email, password });

        if (employer) {
            res.status(201).json({
                _id: employer.id,
                name: employer.name,
                email: employer.email,
                jobs: employer.jobs,
                token: generateToken(employer.id),
            });
        } else {
            res.status(400).json({ message: "Invalid employer data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const loginEmployer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employer = await Employer.findOne({ email }).populate("jobs");

        if (employer && (await employer.matchPassword(password))) {
            res.json({
                _id: employer.id,
                name: employer.name,
                email: employer.email,
                jobs: employer.jobs,
                token: generateToken(employer.id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

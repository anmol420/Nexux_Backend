import Candidate from "../models/candidate.model.js";
import Employer from "../models/employer.model.js";

const registerCandidate = async (req, res) => {
    const { name, email, password } = req.body;
    const candidateExists = await Candidate.findOne({ 
        email,
    });
    if (candidateExists) {
        return res
            .status(400)
            .json({ 
                statusCode: 400,
                message: "Candidate Already Exists.", 
            });
    }
    const employerExists = await Employer.findOne({
        email,
    });
    if (employerExists) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Employer Already Exists.",
            });
    }
    try {
        await Candidate.create({
            name,
            email,
            password,
        });
        return res
            .status(201)
            .json({
                statusCode: 201,
                message: "Candidate Created Successfully.",
            });
    } catch (error) {
        return res
            .status(500)
            .json({ 
                statusCode: 500,
                message: error.message,
            });
    }
};

export {
    registerCandidate
};
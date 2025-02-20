import Candidate from "../models/candidate.model.js";
import Employer from "../models/employer.model.js";

const registerEmployer = async (req, res) => {
    const { name, email, password } = req.body;
    const employerExists = await Employer.findOne({
        email,
    });
    if (employerExists) {
        return res
            .status(400)
            .json({
                statusCode: 201,
                message: "Employer Already Exists.",
            });
    }
    const candidateExists = await Candidate.findOne({
        email,
    });
    if (candidateExists) {
        return res
            .status(400)
            .json({
                statusCode: 201,
                message: "Candidate Already Exists.",
            });
    }
    try {
        await Employer.create({ 
            name,
            email,
            password, 
        });
        return res
            .status(201)
            .json({
                statusCode: 201,
                message: "Employer Created Successfully.",
            });
    } catch (error) {
        return res
            .status(500)
            .json({ 
                message: error.message,
            });
    }
};

export {
    registerEmployer,
};
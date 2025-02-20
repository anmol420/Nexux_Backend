import Candidate from "../models/candidate.model.js";
import Employer from "../models/employer.model.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({
        email,
    });
    const employer = await Employer.findOne({
        email,
    });
    if (candidate) {
        if (await candidate.matchPassword(password)) {
            return res
                .status(200)
                .json({
                    statusCode: 200,
                    message: "Candidate Logged In Successfully.",
                    data: candidate,
                });
        } else {
            return res
                .status(400)
                .json({
                    statusCode: 400,
                    message: "Invalid Password.",
                });
        }
    } else if (employer) {
        if (await employer.matchPassword(password)) {
            return res
                .status(200)
                .json({
                    statusCode: 200,
                    message: "Employer Logged In Successfully.",
                    data: employer,
                });
        } else {
            return res
                .status(400)
                .json({
                    statusCode: 400,
                    message: "Invalid Password.",
                });
        }
    } else {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "User Not Found.",
            });
    }
};

export {
    login,
}
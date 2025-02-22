import axios from "axios";
import Candidate from "../models/candidate.model.js";
import Employer from "../models/employer.model.js";
import { getObjectUrl, putObject } from "../utils/aws.utils.js";

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

const uploadResume = async (req, res) => {
    const { id, mimetype } = req.query;
    if (!id || !mimetype) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Missing Required Query Parameters.",
            });
    }
    const candidate = await Candidate.findById(id);
    if (!candidate) {
        return res
            .status(404)
            .json({
                statusCode: 404,
                message: "Candidate Not Found.",
            });
    }
    try {
        const url = await putObject(`${id}.pdf`, "resume", mimetype);
        return res
            .status(200)
            .json({
                statusCode: 200,
                message: "URL For Resume Upload.",
                url,
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

const submitData = async (req, res) => {
    const { id, salary, location, githubID } = req.body;
    if (!id ||!salary || !location || !githubID) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Missing Required Fields.",
            });
    }
    const candidate = await Candidate.findById(id);
    if (!candidate) {
        return res
            .status(404)
            .json({
                statusCode: 404,
                message: "Candidate Not Found.",
            });
    }
    try {
        const url = await getObjectUrl(`resume/${id}.pdf`);
        const postData = {
            "pdf_url": url,
        };
        const response = await axios.post("https://ranking-model.onrender.com/extract", postData);
        candidate.salary = salary;
        candidate.location = location;
        candidate.pdfUrl = url;
        candidate.pdfText = response.data[0].jobs;
        candidate.githubUrl = githubID;
        candidate.firstTimeLogin = false;
        await candidate.save();
        return res
            .status(200)
            .json({
                statusCode: 200,
                message: "Candidate Data Submitted Successfully.",
                candidate
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
    registerCandidate,
    uploadResume,
    submitData,
};
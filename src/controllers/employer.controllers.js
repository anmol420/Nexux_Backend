import axios from "axios";
import Candidate from "../models/candidate.model.js";
import Employer from "../models/employer.model.js";
import Job from "../models/job.model.js";
import { getObjectUrl, putObject } from "../utils/aws.utils.js";

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

const uploadData = async (req, res) => {
    const { empID, jobCompany, jobTitle } = req.body;
    if (!empID || !jobCompany || !jobTitle) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Missing Required Body Parameters.",
            });
    }
    const updatedTitle = jobTitle.trim().replace(/\s+/g, '-');
    const employer = await Employer.findById(empID);
    if (!employer) {
        return res
            .status(404)
            .json({
                statusCode: 404,
                message: "Employer Not Found.",
            });
    }
    const job = await Job.findOne({
        jobTitle: updatedTitle,
    });
    if (job) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Job With That Title Exists.",
            });
    }
    try {
        const newJob = await Job.create({
            employerId: empID,
            jobCompany: jobCompany,
            jobTitle: updatedTitle,
        });
        return res
            .status(201)
            .json({
                statusCode: 201,
                message: "Job Created Successfully.",
                data: newJob,
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: error.message,
            });
    }
};

const uploadJD = async (req, res) => {
    const { jobTitle, mimetype } = req.query;
    if (!jobTitle) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Missing Required Path Parameter.",
            });
    }
    const job = await Job.findOne({
        jobTitle,
    });
    if (!job) {
        return res
            .status(404)
            .json({
                statusCode: 404,
                message: "Job Not Found.",
            });
    }try {
        const url = await putObject(`${job._id}.pdf`, `jd/${job.employerId}/${job.jobCompany}`, mimetype);
        return res
            .status(200)
            .json({
                statusCode: 200,
                message: "Job Description Uploaded Successfully.",
                data: url,
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: error.message,
            });
    }
};

const submitData = async (req, res) => {
    const { job_id } = req.body;
    if (!job_id) {
        return res
            .status(400)
            .json({
                statusCode: 400,
                message: "Missing Required Body Parameters.",
            });
    }
    const job = await Job.findById(job_id);
    if (!job) {
        return res
            .status(404)
            .json({
                statusCode: 404,
                message: "Job Not Found.",
            });
    }
    try {
        const url = await getObjectUrl(`jd/${job.employerId}/${job.jobCompany}/${job._id}.pdf`);
        const postData = {
            "pdf_url": url
        };
        const response = await axios.post("https://ranking-model.onrender.com/extract", postData);
        job.jdText = response.data[0].jobs;
        await job.save();
        return res
            .status(200)
            .json({
                statusCode: 200,
                message: "Job Description Submitted Successfully.",
                data: job,
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
    uploadData,
    uploadJD,
    submitData
};
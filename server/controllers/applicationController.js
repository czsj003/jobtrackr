const Application = require("../models/Application");
const mongoose = require("mongoose");

const getApplications = async (req, res) => {
    try {
        const { company, status } = req.query;

        const filter = {
            user: req.user._id
        };

        if (company) {
            filter.company = {
                $regex: company,
                $options: "i"
            };
        }

        if (status && status !== "All") {
            filter.status = status;
        }

        const applications = await Application.find(filter).sort({
            appliedDate: -1
        });

        res.json({
            count: applications.length,
            applications
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findOne({
            _id: id,
            user: req.user._id
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            application
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createApplication = async (req, res) => {
    try {
        const {
            company,
            position,
            location,
            workType,
            status,
            salaryMin,
            salaryMax,
            jobUrl,
            appliedDate,
            source,
            notes
        } = req.body;

        if (!company || !position || !appliedDate) {
            return res.status(400).json({
                message: "Company, position, and applied date are required"
            });
        }

        const application = await Application.create({
            user: req.user._id,
            company,
            position,
            location,
            workType,
            status,
            salaryMin: salaryMin ? Number(salaryMin) : null,
            salaryMax: salaryMax ? Number(salaryMax) : null,
            jobUrl,
            appliedDate,
            source,
            notes
        });

        res.status(201).json({
            message: "Application created successfully",
            application
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findOne({
            _id: id,
            user: req.user._id
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const {
            company,
            position,
            location,
            workType,
            status,
            salaryMin,
            salaryMax,
            jobUrl,
            appliedDate,
            source,
            notes
        } = req.body;

        if (!company || !position || !appliedDate) {
            return res.status(400).json({
                message: "Company, position, and applied date are required"
            });
        }

        application.company = company;
        application.position = position;
        application.location = location;
        application.workType = workType;
        application.status = status;
        application.salaryMin = salaryMin ? Number(salaryMin) : null;
        application.salaryMax = salaryMax ? Number(salaryMax) : null;
        application.jobUrl = jobUrl;
        application.appliedDate = appliedDate;
        application.source = source;
        application.notes = notes;

        const updatedApplication = await application.save();

        res.json({
            message: "Application updated successfully",
            application: updatedApplication
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findOne({
            _id: id,
            user: req.user._id
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        await application.deleteOne();

        res.json({
            message: "Application deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};
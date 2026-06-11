const Application = require("../models/Application");

const getCompanyHistory = async (req, res) => {
    try {
        const { companyName } = req.params;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required"
            });
        }

        const applications = await Application.find({
            user: req.user._id,
            company: {
                $regex: companyName,
                $options: "i"
            }
        }).sort({
            appliedDate: -1
        });

        if (applications.length === 0) {
            return res.json({
                company: companyName,
                totalApplications: 0,
                lastAppliedDate: null,
                daysSinceLastApplied: null,
                recentApplication: null,
                applications: []
            });
        }

        const recentApplication = applications[0];
        const lastAppliedDate = recentApplication.appliedDate;

        const today = new Date();
        const lastDate = new Date(lastAppliedDate);

        const diffTime = today.getTime() - lastDate.getTime();
        const daysSinceLastApplied = Math.max(
            0,
            Math.floor(diffTime / (1000 * 60 * 60 * 24))
        );

        res.json({
            company: recentApplication.company,
            totalApplications: applications.length,
            lastAppliedDate,
            daysSinceLastApplied,
            recentApplication,
            applications
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCompanyHistory
};
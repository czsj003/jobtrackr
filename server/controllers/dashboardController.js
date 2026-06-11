const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user._id
        });

        const totalApplications = applications.length;

        const saved = applications.filter(
            (application) => application.status === "Saved"
        ).length;

        const applied = applications.filter(
            (application) => application.status === "Applied"
        ).length;

        const interviewing = applications.filter(
            (application) => application.status === "Interviewing"
        ).length;

        const offers = applications.filter(
            (application) => application.status === "Offer"
        ).length;

        const rejected = applications.filter(
            (application) => application.status === "Rejected"
        ).length;

        const interviewRate =
            totalApplications === 0
                ? 0
                : Math.round(((interviewing + offers) / totalApplications) * 100);

        const offerRate =
            totalApplications === 0
                ? 0
                : Math.round((offers / totalApplications) * 100);

        const rejectionRate =
            totalApplications === 0
                ? 0
                : Math.round((rejected / totalApplications) * 100);

        res.json({
            totalApplications,
            saved,
            applied,
            interviewing,
            offers,
            rejected,
            interviewRate,
            offerRate,
            rejectionRate
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};
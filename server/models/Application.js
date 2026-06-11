const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        company: {
            type: String,
            required: [true, "Company is required"],
            trim: true
        },
        position: {
            type: String,
            required: [true, "Position is required"],
            trim: true
        },
        location: {
            type: String,
            trim: true,
            default: ""
        },
        workType: {
            type: String,
            enum: ["Remote", "Hybrid", "Onsite"],
            default: "Remote"
        },
        status: {
            type: String,
            enum: ["Saved", "Applied", "Interviewing", "Offer", "Rejected"],
            default: "Applied"
        },
        salaryMin: {
            type: Number,
            default: null
        },
        salaryMax: {
            type: Number,
            default: null
        },
        jobUrl: {
            type: String,
            trim: true,
            default: ""
        },
        appliedDate: {
            type: Date,
            required: [true, "Applied date is required"]
        },
        source: {
            type: String,
            trim: true,
            default: ""
        },
        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Application", applicationSchema);
const { CoverLetter } = require("../database");
const { StatusCodes } = require("http-status-codes");
const { generateApiResponse } = require("../services/utilities");



module.exports = {



    /**
     * Create cover letter
     */
    async createCoverLetter(req, res) {
        try {
            const { description, profileId } = req.body;

            const createdCoverLetter = await CoverLetter.create({ description, profileId });
            return generateApiResponse(
                res, StatusCodes.CREATED, true,
                "Cover Letter created successfully!",
                { coverLetter: createdCoverLetter }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in creating Cover Letter!",
                { error }
            );
        }
    },



    /**
     * Update cover letter
     */
    async updateCoverLetter(req, res) {
        try {
            const { _id, description, profileId } = req.body;

            const updatedCoverLetter = await CoverLetter.findByIdAndUpdate(
                _id, { description, profileId }, { new: true },
            );

            const isUpdated = !!updatedCoverLetter;
            return generateApiResponse(
                res, StatusCodes.OK, isUpdated,
                (isUpdated ? "Cover Letter updated successfully!" : "No Cover Letter data updated!"),
                { coverLetter: updatedCoverLetter }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating Cover Letter!",
                { error }
            );
        }
    },



    /**
    * Delete cover letter
    */
    async deleteCoverLetter(req, res) {
        try {
            const coverLetterId = req.params.coverLetterId;

            const deletedCoverLetter = await CoverLetter.findByIdAndDelete(coverLetterId);
            const isDeleted = !!deletedCoverLetter;
            return generateApiResponse(
                res, (isDeleted ? StatusCodes.OK : StatusCodes.NOT_FOUND), isDeleted,
                (isDeleted ? "Cover Letter deleted successfully!" : "Cover Letter not found!"),
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in deleting Cover Letter!",
                { error }
            );
        }
    },



    /**
    * Get cover letter
    */
    async getCoverLetter(req, res) {
        try {
            const coverLetterId = req.params.coverLetterId;
            const foundCoverLetter = await CoverLetter.findById(coverLetterId);

            const isFound = !!foundCoverLetter;
            return generateApiResponse(
                res, (isFound ? StatusCodes.OK : StatusCodes.NOT_FOUND), isFound,
                (isFound ? "Cover Letter fetched successfully!" : "Cover Letter not found!"),
                { coverLetter: foundCoverLetter }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting Cover Letter!",
                { error }
            );
        }
    },



    /**
    * Get all cover letters
    */
    async getAllCoverLetters(req, res) {
        try {
            const allCoverLetters = await CoverLetter.find().sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "All Cover Letters fetched successfully!",
                { coverLetters: allCoverLetters }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting All Cover Letters!",
                { error }
            );
        }
    },



    /**
    * Get cover lLetters by profile
    */
    async getCoverLettersByProfile(req, res) {
        try {
            const profileId = req.params.profileId;
            const coverLettersByProfile = await CoverLetter.find({ profileId }).sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "Cover Letters by Profile fetched successfully!",
                { coverLetters: coverLettersByProfile }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting Cover Letters by Profile!",
                { error }
            );
        }
    },



}
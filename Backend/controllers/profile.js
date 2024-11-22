const { CoverLetter, Faq, Profile } = require("../database");
const { StatusCodes } = require("http-status-codes");
const { generateApiResponse } = require("../services/utilities");



module.exports = {



    /**
     * Create profile
     */
    async createProfile(req, res) {
        try {
            const { name, stack, type } = req.body;

            const createdProfile = await Profile.create({ name, stack, type });
            return generateApiResponse(
                res, StatusCodes.CREATED, true,
                "Profile created successfully!",
                { profile: createdProfile }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in creating Profile!",
                { error }
            );
        }
    },



    /**
     * Update profile
     */
    async updateProfile(req, res) {
        try {
            const { _id, name, stack, type } = req.body;

            const updatedProfile = await Profile.findByIdAndUpdate(
                _id, { name, stack, type }, { new: true },
            );

            const isUpdated = !!updatedProfile;
            return generateApiResponse(
                res, StatusCodes.OK, isUpdated,
                (isUpdated ? "Profile updated successfully!" : "No Profile data updated!"),
                { profile: updatedProfile }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating Profile!",
                { error }
            );
        }
    },



    /**
    * Delete profile
    */
    async deleteProfile(req, res) {
        try {
            const profileId = req.params.profileId;

            const deletedProfile = await Profile.findByIdAndDelete(profileId);
            const isDeleted = !!deletedProfile;
            return generateApiResponse(
                res, (isDeleted ? StatusCodes.OK : StatusCodes.NOT_FOUND), isDeleted,
                (isDeleted ? "Profile deleted successfully!" : "Profile not found!"),
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in deleting Profile!",
                { error }
            );
        }
    },



    /**
    * Get profile
    */
    async getProfile(req, res) {
        try {
            const profileId = req.params.profileId;
            const foundProfile = await Profile.findById(profileId);

            const isFound = !!foundProfile;
            return generateApiResponse(
                res, (isFound ? StatusCodes.OK : StatusCodes.NOT_FOUND), isFound,
                (isFound ? "Profile fetched successfully!" : "Profile not found!"),
                { profile: foundProfile }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting Profile!",
                { error }
            );
        }
    },



    /**
    * Get profile detail
    */
    async getProfileDetail(req, res) {
        try {
            const profileId = req.params.profileId;

            let profileDetail = {};
            const foundProfile = await Profile.findById(profileId);
            const isFound = !!foundProfile;

            if (isFound) {
                profileDetail['profile'] = foundProfile;
                profileDetail['coverLetters'] = await CoverLetter.find({ profileId }).sort({ createdAt: -1 });
                profileDetail['faqs'] = await Faq.find({ profileId }).sort({ createdAt: -1 });
            }

            return generateApiResponse(
                res, (isFound ? StatusCodes.OK : StatusCodes.NOT_FOUND), isFound,
                (isFound ? "Profile fetched successfully!" : "Profile not found!"),
                { profileDetail }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting Profile!",
                { error }
            );
        }
    },



    /**
    * Get all profiles
    */
    async getAllProfiles(req, res) {
        try {
            const allProfiles = await Profile.find().sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "All Profiles fetched successfully!",
                { profiles: allProfiles }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting All Profiles!",
                { error }
            );
        }
    },

}
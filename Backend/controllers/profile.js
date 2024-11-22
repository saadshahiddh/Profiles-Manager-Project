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
                profileDetail['coverLetters'] = await CoverLetter.find({ profileId });
                profileDetail['faqs'] = await Faq.find({ profileId });
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
     * Save profile detail
     */
    async saveProfileDetail(req, res) {
        try {
            const { profile, faqs, coverLetters } = req.body;

            let profileId = profile?._id;
            const profileAction = profileId ? 'created' : 'updated';

            const { name = '', stack = '', type = '' } = profile || {};
            const profileData = { name, stack, type };
            if (profileId) {
                const updatedProfile = await Profile.findByIdAndUpdate(
                    profileId, profileData, { new: true },
                );
                profileId = updatedProfile?._id;
            } else {
                const createdProfile = await Profile.create(profileData);
                profileId = createdProfile?._id;
            }

            if (coverLetters.length) {
                await Promise.all(coverLetters.map(async (item) => {
                    let coverLetterData = { ...item, profileId };
                    if (coverLetterData._id) {
                        await CoverLetter.findByIdAndUpdate(coverLetterData._id, coverLetterData);
                    } else {
                        await CoverLetter.create(coverLetterData);
                    }
                }));
            }

            if (faqs.length) {
                await Promise.all(faqs.map(async (item) => {
                    let faqData = { ...item, profileId };
                    if (faqData._id) {
                        await Faq.findByIdAndUpdate(faqData._id, faqData);
                    } else {
                        await Faq.create(faqData);
                    }
                }));
            };

            let profileDetail = {};
            profileDetail['profile'] = await Profile.findById(profileId);
            profileDetail['coverLetters'] = await CoverLetter.find({ profileId });
            profileDetail['faqs'] = await Faq.find({ profileId });

            return generateApiResponse(
                res, StatusCodes.OK, true,
                "Profile detail saved successfully!",
                { profileDetail, profileAction }
            );
        } catch (error) {
            console.log(error);

            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in saving Profile detail!",
                { error }
            );
        }
    },


}
const { Faq } = require("../database");
const { StatusCodes } = require("http-status-codes");
const { generateApiResponse } = require("../services/utilities");



module.exports = {



    /**
     * Create faq
     */
    async createFaq(req, res) {
        try {
            const { answer, question, profileId } = req.body;

            const createdFaq = await Faq.create({ answer, question, profileId });
            return generateApiResponse(
                res, StatusCodes.CREATED, true,
                "FAQ created successfully!",
                { faq: createdFaq }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in creating FAQ!",
                { error }
            );
        }
    },



    /**
     * Update faq
     */
    async updateFaq(req, res) {
        try {
            const { _id, answer, question, profileId } = req.body;

            const updatedFaq = await Faq.findByIdAndUpdate(
                _id, { answer, question, profileId }, { new: true },
            );

            const isUpdated = !!updatedFaq;
            return generateApiResponse(
                res, StatusCodes.OK, isUpdated,
                (isUpdated ? "FAQ updated successfully!" : "No FAQ data updated!"),
                { faq: updatedFaq }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in updating FAQ!",
                { error }
            );
        }
    },



    /**
    * Delete faq
    */
    async deleteFaq(req, res) {
        try {
            const faqId = req.params.faqId;

            const deletedFaq = await Faq.findByIdAndDelete(faqId);
            const isDeleted = !!deletedFaq;
            return generateApiResponse(
                res, (isDeleted ? StatusCodes.OK : StatusCodes.NOT_FOUND), isDeleted,
                (isDeleted ? "FAQ deleted successfully!" : "FAQ not found!"),
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in deleting FAQ!",
                { error }
            );
        }
    },



    /**
    * Get faq
    */
    async getFaq(req, res) {
        try {
            const faqId = req.params.faqId;
            const foundFaq = await Faq.findById(faqId);

            const isFound = !!foundFaq;
            return generateApiResponse(
                res, (isFound ? StatusCodes.OK : StatusCodes.NOT_FOUND), isFound,
                (isFound ? "FAQ fetched successfully!" : "FAQ not found!"),
                { faq: foundFaq }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting FAQ!",
                { error }
            );
        }
    },



    /**
    * Get all faqs
    */
    async getAllFaqs(req, res) {
        try {
            const allFaqs = await Faq.find().sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "All FAQs fetched successfully!",
                { faqs: allFaqs }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting All FAQs!",
                { error }
            );
        }
    },



    /**
    * Get faqs by profile
    */
    async getFaqsByProfile(req, res) {
        try {
            const profileId = req.params.profileId;
            const faqsByProfile = await Faq.find({ profileId }).sort({ createdAt: -1 });
            return generateApiResponse(
                res, StatusCodes.OK, true,
                "FAQs by Profile fetched successfully!",
                { faqs: faqsByProfile }
            );
        } catch (error) {
            return generateApiResponse(
                res, StatusCodes.INTERNAL_SERVER_ERROR, false,
                "Error occurred in getting FAQs by Profile!",
                { error }
            );
        }
    },

}
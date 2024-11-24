const { Profile, Faq, CoverLetter } = require("../database");


/**
 * Get profile form data obj
 * @param {string} profileId 
 * @returns 
 */
async function getProfileFormDataObj(profileId) {
    let profileFormData = null;
    const foundProfile = await Profile.findById(profileId);
    if (foundProfile) {
        profileFormData = {};
        profileFormData['profile'] = foundProfile;
        profileFormData['coverLetters'] = await CoverLetter.find({ profileId });
        profileFormData['faqs'] = await Faq.find({ profileId });
    }
    return profileFormData;
}


module.exports = {
    getProfileFormDataObj,
}
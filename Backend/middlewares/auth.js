const { checkAuthToken } = require("../services/authentication");



/**
 * Is auth user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function isAuthUser(req, res, next) {
    await checkAuthToken(req, res, next);
}


module.exports = {
    isAuthUser,
}
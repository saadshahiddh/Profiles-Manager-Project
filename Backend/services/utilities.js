require("dotenv").config();



/**
 * 
 * @param  {string} variableName
 * @returns 
 */
function getEnvVariable(variableName) {
  if (process.env.hasOwnProperty(variableName)) {
    return process.env[variableName];
  } else {
    return null;
  }
}



/**
 * Generate api response
 * @param {*} res 
 * @param {number} statusCode 
 * @param {boolean} isSuccess 
 * @param {string} message 
 * @param {*} data 
 * @returns 
 */
async function generateApiResponse(res, statusCode, isSuccess, message, data) {
  return res.status(statusCode).json({
    statusCode: statusCode,
    isSuccess: isSuccess,
    message: message,
    ...data,
  });
}



module.exports = {
  getEnvVariable,
  generateApiResponse,
};



require("dotenv").config();
const mongoose = require("mongoose");


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



/**
 * Format mongoose data
 * @param {*} data 
 * @returns 
 */
function formatMongooseData(data) {
  function isObjectId(value) {
    return value instanceof mongoose.Types.ObjectId && mongoose.Types.ObjectId.isValid(value);
  }
  function shouldExcludeAttribute(attributeValue) {
    return attributeValue !== null && typeof attributeValue === 'object' && !Array.isArray(attributeValue);
  }

  if (!data) {
    return null;
  }

  if (isObjectId(data)) {
    return data.toString();
  }

  if (typeof data.toObject === 'function') {
    data = data.toObject();
  }

  if (Array.isArray(data)) {
    return data.map(item => formatMongooseData(item));
  } else if (typeof data === 'object') {
    const result = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (shouldExcludeAttribute(data[key])) {
          result[key] = data[key];
        } else {
          // Rename _id to id and continue the conversion
          // const newKey = key === '_id' ? 'id' : key;
          result[key] = formatMongooseData(data[key]);
        }
      }
    }

    return result;
  } else {
    return data;
  }
}



/**
 * Convert simple to mongoose object id
 * @param {*} id 
 * @returns 
 */
function convertSimpleToMongooseObjectId(_id) {
  return mongoose.Types.ObjectId.isValid(_id) && !(_id instanceof mongoose.Types.ObjectId) ? new mongoose.Types.ObjectId(_id) : _id;
}


module.exports = {
  getEnvVariable,
  generateApiResponse,
  formatMongooseData,
  convertSimpleToMongooseObjectId,
};


